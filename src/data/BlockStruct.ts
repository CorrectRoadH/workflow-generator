export default interface BlockStruct {
  title: string;
  argNum: number;
  args: Array<string>;
  argsTip: Array<string>;
  componentType: string;
  code: string;
  children: Array<number>;
}
