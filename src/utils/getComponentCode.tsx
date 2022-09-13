import BlockStructInstance from "../data/BlockStructInstance";

const getComponentCode = (
  componentID: number,
  componentsData: Array<BlockStructInstance>
) => {
  let code = "";
  let temp_code = componentsData[componentID].code;

  for (let i = 0; i < componentsData[componentID].argNum; i++) {
    temp_code = temp_code.replace(
      `$replace${i}$`,
      componentsData[componentID].args[i]
    );
  }
  code += temp_code;

  componentsData[componentID].children.forEach((componentID: number) => {
    code += getComponentCode(componentID, componentsData);
  });
  return code;
};
export default getComponentCode;
