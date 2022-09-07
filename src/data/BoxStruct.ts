export default interface BoxStruct {
  title: string;
  argNum: number;
  args: Array<string>;
  componentType: string;
  code: string;
}

export const generateCode = (boxdata: BoxStruct) => {
  return boxdata.code;
};
