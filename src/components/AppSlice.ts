import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import BlockStruct from "../data/BlockStruct";
import { githubComponentData } from "../data/github/intData";
import BlockStructInstance, {
  createBoxInstance,
} from "../data/BlockStructInstance";
import githubState from "../data/github/githubState";

export interface InputValue {
  componentID: number;
  order: number;
  value: string;
}

export interface ShowState {
  dragObejct: BlockStruct;
  presentComponent: Array<BlockStructInstance>;
  // 不用map是因为redux不能传递不可序列化的对象
  ComponentArray: Array<BlockStruct>;
  code: string;
}

const initialState: ShowState = {
  presentComponent: githubState,
  dragObejct: {} as BlockStruct,
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

      // 把子组件实例化
      if (state.dragObejct.childrenInstance !== undefined) {
        state.dragObejct.childrenInstance.forEach((item) => {
          const new_children_instance = createBoxInstance(
            item,
            state.presentComponent.length
          );
          new_children_instance.inTop = false;
          state.presentComponent[new_instance.id].children.push(
            new_children_instance.id
          );
          state.presentComponent.push(new_children_instance);
        });
      }

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

      // 把子组件实例化
      if (state.dragObejct.childrenInstance !== undefined) {
        state.dragObejct.childrenInstance.forEach((item) => {
          const new_children_instance = createBoxInstance(
            item,
            state.presentComponent.length
          );
          new_children_instance.inTop = false;
          state.presentComponent[new_instance.id].children.push(
            new_children_instance.id
          );
          state.presentComponent.push(new_children_instance);
        });
      }
    },
    dragObject: (state, action: PayloadAction<BlockStruct>) => {
      state.dragObejct = action.payload;
    },
    dropObject: (state, action: PayloadAction<BlockStruct>) => {
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
