import BlockStruct from "./BlockStruct";
import * as _ from "lodash";

export default interface BlockStructInstance extends BlockStruct {
  id: number;
  inTop: boolean; //是否是在面板的最外面，决定了渲染
}
export const createBoxInstance = (box: BlockStruct, id: number) => {
  const newInstance: BlockStructInstance = _.cloneDeep<BlockStruct>(box);
  newInstance.id = id;
  newInstance.inTop = true;
  return newInstance;
};

export const generateCode = (boxdata: BlockStructInstance) => {
  let temp_code = boxdata.code;

  for (let i = 0; i < boxdata.argNum; i++) {
    temp_code = temp_code.replace(`$replace${i}$`, boxdata.args[i]);
  }

  if (boxdata.componentType === "singleComponent") {
    return temp_code;
  }
  if (boxdata.componentType === "container") {
    boxdata.children.forEach((id) => {
      // temp_code += item.code; // 这里拿不到子组件的code
    });
    return temp_code;
  }
};
