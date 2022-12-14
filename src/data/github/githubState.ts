import BoxStructInstance from "../BlockStructInstance";

const githubState: Array<BoxStructInstance> = new Array<BoxStructInstance>();
githubState.push({
  id: 0,
  title: "yaml 基础",
  argNum: 2,
  inTop: true,
  parentID: -1,
  args: ["请输入名称", "请输入名称"],
  argsTip: ["脚本名", "分支名:"],
  componentType: "base",
  code: `name: $replace0$
  
  on:
    push:
      branches:
        - $replace1$
  
  jobs:`,
  childrenInstance: undefined,
  children: [],
});

export default githubState;
