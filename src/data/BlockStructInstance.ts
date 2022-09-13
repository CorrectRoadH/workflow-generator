import BlockStruct from "./BlockStruct";

export default interface BlockStructInstance extends BlockStruct {
  id: number;
  parentID: number; // 父id
  inTop: boolean; //是否是在面板的最外面，决定了渲染
  // todo: 回头研究一下，这个子组件是一数组真的好吗?要不要改成像logseq那种，子组件只有一个，然后其它是兄弟组件挂在子组件上。
}
