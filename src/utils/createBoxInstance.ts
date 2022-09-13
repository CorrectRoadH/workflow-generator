import _ from "lodash";
import BlockStruct from "../data/BlockStruct";
import BlockStructInstance from "../data/BlockStructInstance";

const createBoxInstance = (
  blockdata: BlockStruct,
  id: number,
  isTop: boolean,
  parentID: number
) => {
  const newInstance: BlockStructInstance = _.cloneDeep<BlockStructInstance>(
    blockdata as BlockStructInstance
  );
  newInstance.id = id;
  newInstance.inTop = isTop;
  newInstance.parentID = parentID;
  return newInstance;
};
export default createBoxInstance;
