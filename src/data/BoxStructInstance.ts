import BoxStruct from "./BoxStruct";
import * as _ from "lodash";

export default interface BoxStructInstance extends BoxStruct {
  id: string;
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

    console.log(code);

    for (let i = 0; i < boxdata.argNum; i++) {
      code = code.replace(`$replace${i}$`, boxdata.args[i]);
    }

    boxdata.children.forEach((item) => {
      code += item.code;
    });
    return code;
  }
};
