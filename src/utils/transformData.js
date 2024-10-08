import { v4 as uuidv4 } from "uuid";
import {
  calculateNodeDimensions,
  calculateNestedNodeDimensions,
} from "./calculateNodeDimensions";
import { classifyObjectData } from "./classifyObjectData";

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
  if (
    dataArray.length === 0 ||
    !dataArray.every((item) => typeof item === "object" && item !== null)
  ) {
    throw new Error(
      "inputData debe ser un array de objetos no vacíos o un solo objeto."
    );
  }

  let nodeArray = []; // Array para almacenar los nuevos objetos

  // Función para procesar un objeto y sus valores anidados
  function processObject(obj, parentId = null, typoData) {
    let classObjData = classifyObjectData(obj);
    let nodeData = classObjData.nodeData;
    let nestedObjects = classObjData.nestedObjects;
    let nestedArrays = classObjData.nestedArrays;

    // console.log("nodeData -> ", nodeData);
    // console.log("nestedObjects -> ", nestedObjects);
    // console.log("nestedArrays -> ", nestedArrays);

    let NodeDimensions = calculateNodeDimensions(nodeData);
    // Nodo principal
    let mainNode = {
      id: uuidv4(),
      height: NodeDimensions.height, // Altura dinámica
      width: NodeDimensions.width, // Ancho dinámico
      type: parentId === null ? "nodo" : typoData,
      data: nodeData,
      parentId: parentId,
    };

    nodeArray.push(mainNode);
    // console.log("xxxxxxxxxxxxxxxx");
    // console.log("nestedObjects -> ", nestedObjects);
    // Procesar objetos anidados
    nestedObjects.forEach(({ key, value }) => {
      let nestedNodeDimention = calculateNestedNodeDimensions(key);
      let nestedNode = {
        id: uuidv4(),
        height: nestedNodeDimention.height, // Altura fija o dinámica
        width: nestedNodeDimention.width, // Ancho dinámico basado en la longitud de la clave
        type: typoData ?? "Object",
        data: { name: key },
        parentId: mainNode.id,
      };

      nodeArray.push(nestedNode);

      // Recursivamente procesar el objeto anidado
      processObject(value, nestedNode.id, "ElementObject");
    });

    // Procesar arreglos anidados
    nestedArrays.forEach(({ key, value }) => {
      // console.log("key -> ", key);
      // console.log("type key -> ", typeof key);
      // console.log("value -> ", value);
      // console.log("typeof value -> ", typeof value);

      // Verificar si el arreglo contiene elementos
      if (value.length > 0) {
        // Crear un nodo para representar el array principal
        let nestedNodeDimention = calculateNestedNodeDimensions(key);
        let arrayNode = {
          id: uuidv4(),
          height: nestedNodeDimention.height, // Altura fija o dinámica
          width: nestedNodeDimention.width, // Ancho dinámico
          type: "Array",
          data: { name: key },
          parentId: mainNode.id,
        };

        nodeArray.push(arrayNode);

        // Iterar sobre los elementos del array
        value.forEach((element) => {
          // Si el elemento es un objeto
          if (
            typeof element === "object" &&
            !Array.isArray(element) &&
            element !== null
          ) {
            processObject(element, arrayNode.id, "ObjectObject");
          }
          // Si el elemento es un array anidado
          else if (Array.isArray(element)) {
            let nestedArrayNodeDimention =
              calculateNestedNodeDimensions("Array");

            let nestedArrayNode = {
              id: uuidv4(),
              height: nestedArrayNodeDimention.height,
              width: nestedArrayNodeDimention.width,
              type: "Array",
              data: { name: "Array" }, // Puedes nombrar el array anidado según corresponda
              parentId: arrayNode.id,
            };

            nodeArray.push(nestedArrayNode);

            // Procesar cada elemento dentro del array anidado
            element.forEach((nestedElement) => {
              if (
                typeof nestedElement === "object" &&
                !Array.isArray(nestedElement) &&
                nestedElement !== null
              ) {
                processObject(
                  nestedElement,
                  nestedArrayNode.id,
                  "ObjectObject"
                );
              }
              // Si el elemento es un valor primitivo dentro del array anidado
              else if (
                typeof nestedElement === "string" ||
                typeof nestedElement === "number"
              ) {
                let nestedElementDimention = calculateNestedNodeDimensions(
                  nestedElement.toString()
                );

                let nestedElementNode = {
                  id: uuidv4(),
                  height: nestedElementDimention.height,
                  width: nestedElementDimention.width,
                  type: "ElementArray",
                  data: { value: nestedElement },
                  parentId: nestedArrayNode.id,
                };

                nodeArray.push(nestedElementNode);
              }
            });
          }
          // Si el elemento es un valor primitivo (string o número)
          else if (typeof element === "string" || typeof element === "number") {
            let nestedNodeDimention = calculateNestedNodeDimensions(
              element.toString()
            );

            let elementNode = {
              id: uuidv4(),
              height: nestedNodeDimention.height, // Altura fija o dinámica
              width: nestedNodeDimention.width, // Ancho dinámico
              type: "ElementArray",
              data: { value: element },
              parentId: arrayNode.id,
            };

            nodeArray.push(elementNode);
          }
        });
      } else {
        // console.log("El arreglo está vacío");
        console.log(" ");
      }
    });
  }

  // Procesar cada objeto en el array
  // console.log("Procesando el objeto enviado");
  dataArray.forEach((obj) => processObject(obj));

  return nodeArray;
}
