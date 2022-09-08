export default interface BoxStruct {
  title: string;
  argNum: number;
  args: Array<string>;
  componentType: string;
  code: string;
  children: Array<BoxStruct>;
}

export const generateCode = (boxdata: BoxStruct) => {
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
