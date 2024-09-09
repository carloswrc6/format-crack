import { v4 as uuidv4 } from "uuid";

/**
 * Transforma un array de objetos o un solo objeto en un array de nodos con formato específico.
 * Los objetos y arreglos anidados también se incluyen en el resultado final con tipos y nombres específicos.
 *
 * @param {Array|Object} inputData - Array de objetos o un solo objeto a transformar.
 * @returns {Array} nodeArray - Array de nodos transformados.
 */
export function transformToNodeArray(inputData) {
  // Asegurarse de que `inputData` es un array, si es un solo objeto, convertirlo en un array
  let dataArray = Array.isArray(inputData) ? inputData : [inputData];

  // Comprobar que `dataArray` no está vacío y que contiene solo objetos válidos
  if (dataArray.length === 0 || !dataArray.every(item => typeof item === 'object' && item !== null)) {
    throw new Error("inputData debe ser un array de objetos no vacíos o un solo objeto.");
  }

  let nodeArray = []; // Array para almacenar los nuevos objetos

  // Función para procesar un objeto y sus valores anidados
  function processObject(obj, parentId = null) {
    let nodeData = {};
    let nestedObjects = [];
    let nestedArrays = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        let value = obj[key];

        if (Array.isArray(value)) {
          // Es un arreglo, procesar el arreglo
          nestedArrays.push({ key, value });
        } else if (typeof value === 'object' && value !== null) {
          // Es un objeto anidado, procesar el objeto
          nestedObjects.push({ key, value });
        } else {
          // Valor primitivo
          nodeData[key] = value;
        }
      }
    }

    // Nodo principal
    let mainNode = {
      id: uuidv4(),
      height: 125,
      width: 250,
      type: parentId === null ? "nodo" : "ObjectObject",
      data: nodeData,
      parentId: parentId
    };

    nodeArray.push(mainNode);

    // Procesar objetos anidados
    nestedObjects.forEach(({ key, value }) => {
      // Crear nodo intermedio para el objeto anidado
      let nestedNode = {
        id: uuidv4(),
        height: 125,
        width: 250,
        type: "Object",
        data: { name: key },
        parentId: mainNode.id
      };

      nodeArray.push(nestedNode);

      // Recursivamente procesar el objeto anidado
      processObject(value, nestedNode.id);
    });

    // Procesar arreglos anidados
    nestedArrays.forEach(({ key, value }) => {
      // Crear nodo intermedio para el arreglo
      let arrayNode = {
        id: uuidv4(),
        height: 125,
        width: 250,
        type: "Array",
        data: { name: key },
        parentId: mainNode.id
      };

      nodeArray.push(arrayNode);

      // Crear un nodo para cada elemento del arreglo
      value.forEach((element) => {
        let elementNode = {
          id: uuidv4(),
          height: 125,
          width: 250,
          type: "ElementArray",
          data: { value: element },
          parentId: arrayNode.id
        };

        nodeArray.push(elementNode);
      });
    });
  }

  // Procesar cada objeto en el array
  dataArray.forEach(obj => processObject(obj));

  return nodeArray;
}
