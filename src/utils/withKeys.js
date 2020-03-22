import { castArray } from "./essentialLodash";

let withKeys = (obj, startsWith, not = false) => {
  return Object.keys(obj).reduce((acc, key) => {
    let condition = castArray(startsWith).some(word => key.startsWith(word));
    condition = not ? !condition : condition;
    if (condition) acc[key] = obj[key];

    return acc;
  }, {});
};

export default withKeys;
