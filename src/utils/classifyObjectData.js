export function classifyObjectData(obj, collapseGraph) {
  let nodeData = {};
  let nestedObjects = [];
  let nestedArrays = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let value = obj[key];

      if (Array.isArray(value)) {
        // Es un arreglo, procesar el arreglo
        nestedArrays.push({ key, value });
      } else if (typeof value === "object" && value !== null) {
        // Es un objeto anidado, procesar el objeto
        nestedObjects.push({ key, value });
      } else {
        // Valor primitivo
        nodeData[key] = value;
      }
    }
  }

  return {
    nodeData,
    nestedObjects,
    nestedArrays,
  };
}
