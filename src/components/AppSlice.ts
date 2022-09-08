import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import BoxStruct from "../data/BoxStruct";
import { githubComponentData } from "../data/intData";
import BoxStructInstance, {
  createBoxInstance,
} from "../data/BoxStructInstance";
import githubState from "../data/githubState";

export interface InputValue {
  componentID: number;
  order: number;
  value: string;
}

export interface ShowState {
  dragObejct: BoxStruct;
  presentComponent: Array<BoxStructInstance>;
  // 不用map是因为redux不能传递不可序列化的对象
  ComponentArray: Array<BoxStruct>;
  code: string;
}

const initialState: ShowState = {
  presentComponent: githubState,
  dragObejct: {} as BoxStruct,
  ComponentArray: githubComponentData,
  code: "",
};

export const counterSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    moveToContainer: (state, action: PayloadAction<number>) => {
      const new_instance = createBoxInstance(
        state.dragObejct,
        state.presentComponent.length
      );
      new_instance.inTop = false;
      state.presentComponent.push(new_instance);
      state.presentComponent[action.payload].children.push(new_instance.id);

      // 子组件只能存id，不能是类型嵌套，因为就算他们本来是指向一个，但是在序列化之后就不是一个东西了。(等于深拷贝)
    },
    setComponentInputValue: (state, action: PayloadAction<InputValue>) => {
      state.presentComponent[action.payload.componentID].args[
        action.payload.order
      ] = action.payload.value;
    },
    move: (state) => {
      const new_instance = createBoxInstance(
        state.dragObejct,
        state.presentComponent.length
      );
      state.presentComponent.push(new_instance);
      // 因为 isTop默认是true，这里不用初始化。
    },
    dragObject: (state, action: PayloadAction<BoxStruct>) => {
      state.dragObejct = action.payload;
    },
    dropObject: (state, action: PayloadAction<BoxStruct>) => {
      state.dragObejct = action.payload;
    },
    generageCode: (state) => {
      // 没办法做成自动触发，挺坑的，回头研究一下吧。
      let code = "";
      state.presentComponent.forEach((component) => {
        if (component.inTop) {
          let temp_code = component.code;
          for (let i = 0; i < component.argNum; i++) {
            temp_code = temp_code.replace(`$replace${i}$`, component.args[i]);
          }
          code += temp_code;
          component.children.forEach((id) => {
            let ctemp_code = state.presentComponent[id].code;
            for (let i = 0; i < state.presentComponent[id].argNum; i++) {
              ctemp_code = ctemp_code.replace(
                `$replace${i}$`,
                state.presentComponent[id].args[i]
              );
            }

            code += ctemp_code;
          });
        }
      });
      state.code = code;
    },
  },
});

export const {
  move,
  moveToContainer,
  setComponentInputValue,
  dragObject,
  dropObject,
  generageCode,
} = counterSlice.actions;

export default counterSlice.reducer;
