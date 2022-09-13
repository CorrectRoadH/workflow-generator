import { expect, it } from "vitest";
import BlockStruct from "../../data/BlockStruct";
import BlockStructInstance from "../../data/BlockStructInstance";
import createBoxInstance from "../createBoxInstance";


// more test instance 
// when have children
// when have multi children 
// when children have children
// and in futuer. when that data stucture change to a single children node and a brother node
it("test createBoxInstance when a singel component", () => {
  const blockdata: BlockStruct = {
    title: "hello",
    argNum: 0,
    args: [],
    argsTip: [],
    componentType: "block",
    code: `1234234`,
    children: [],
    childrenInstance: undefined,
  };

  expect(
    createBoxInstance(blockdata, 0, true, -1) ===
      ({
        title: "hello",
        argNum: 0,
        args: [],
        argsTip: [],
        componentType: "block",
        code: `1234234`,
        children: [],
        childrenInstance: undefined,
        inTop: true,
        id: 0,
        parentID: -1,
      } as BlockStructInstance)
  );
});
