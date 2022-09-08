import BoxStruct from "./BoxStruct";
import * as _ from "lodash";

export default interface BoxStructInstance {
  id: string;
  title: string;
  argNum: number;
  args: Array<string>;
  componentType: string;
  code: string;
  children: Array<BoxStructInstance>;
}
export const createBoxInstance = (box: BoxStruct) => {
  const newInstance: BoxStructInstance = _.cloneDeep<BoxStruct>(box);
  newInstance.id = Date.now().toString();
  return newInstance;
};

export const generateCode = (boxdata: BoxStructInstance) => {
  if (boxdata.componentType === "singleComponent") {
    return boxdata.code;
  }
  if (boxdata.componentType === "container") {
    let code = boxdata.code;

    boxdata.children.forEach((item) => {
      code += item.code;
    });
    return code;
  }
};
