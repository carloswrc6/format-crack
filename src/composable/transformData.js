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

    // Cálculo dinámico de la altura en función del número de claves
    const calculatedHeight = (Object.keys(nodeData).length * 30) - (Object.keys(nodeData).length * 2); 

    // Cálculo dinámico del ancho en función de la concatenación de claves y valores
    const longestConcatenation = Object.entries(nodeData).reduce((maxLength, [key, value]) => {
      const concatenatedLength = (key + value.toString()).length;
      return Math.max(maxLength, concatenatedLength);
    }, 0);
    const calculatedWidth = longestConcatenation * 10 + 100; // Ancho basado en la longitud de clave + valor concatenados

    // Nodo principal
    let mainNode = {
      id: uuidv4(),
      height: calculatedHeight, // Altura dinámica
      width: calculatedWidth, // Ancho dinámico
      type: parentId === null ? "nodo" : "ObjectObject",
      data: nodeData,
      parentId: parentId
    };

    nodeArray.push(mainNode);
 
    // Procesar objetos anidados
    nestedObjects.forEach(({ key, value }) => {
      // Cálculo dinámico para el nodo intermedio
      const nestedNodeHeight = 30; // Altura fija para el nodo intermedio
      const nestedNodeWidth = (key.length + 5) * 10 + 100; // Ancho basado en la longitud de la clave

      let nestedNode = {
        id: uuidv4(),
        height: nestedNodeHeight, // Altura fija o dinámica
        width: nestedNodeWidth, // Ancho dinámico basado en la longitud de la clave
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
      if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
        // El arreglo contiene objetos

        // Cálculo dinámico del nodo para el arreglo de objetos
        const arrayObjectNodeHeight = 30; // Altura fija para el nodo del arreglo
        const arrayObjectNodeWidth = (key.length + 5) * 10 + 80; // Ancho dinámico basado en la longitud de la clave

        let arrayObjectNode = {
          id: uuidv4(),
          height: arrayObjectNodeHeight, // Altura fija o dinámica
          width: arrayObjectNodeWidth, // Ancho dinámico
          type: "ArrayObject",
          data: { name: key },
          parentId: mainNode.id
        };

        nodeArray.push(arrayObjectNode);

        // Crear un nodo para cada objeto dentro del arreglo
        value.forEach((element) => {
          processObject(element, arrayObjectNode.id);
        });
      } else {
        // El arreglo contiene elementos primitivos

        // Cálculo dinámico del nodo para el arreglo
        const arrayNodeHeight = 30; // Altura fija para el nodo del arreglo
        const arrayNodeWidth = (key.length + 5) * 10 + 80; // Ancho dinámico basado en la longitud de la clave

        let arrayNode = {
          id: uuidv4(),
          height: arrayNodeHeight, // Altura fija o dinámica
          width: arrayNodeWidth, // Ancho dinámico
          type: "Array",
          data: { name: key },
          parentId: mainNode.id
        };

        nodeArray.push(arrayNode);

        // Crear un nodo para cada elemento del arreglo
        value.forEach((element) => {
          // Cálculo dinámico del nodo para cada elemento del arreglo
          const elementNodeWidth = (element.toString().length + 5) * 10 + 80; // Ancho dinámico basado en la longitud del valor

          let elementNode = {
            id: uuidv4(),
            height: 30, // Altura fija o dinámica
            width: elementNodeWidth, // Ancho dinámico
            type: "ElementArray",
            data: { value: element },
            parentId: arrayNode.id
          };

          nodeArray.push(elementNode);
        });
      }
    });
  }

  // Procesar cada objeto en el array
  dataArray.forEach(obj => processObject(obj));

  return nodeArray;
}
