import { v4 as uuidv4 } from "uuid";
import {
  calculateNodeDimensions,
  calculateNestedNodeDimensions,
} from "./calculateNodeDimensions";
import { classifyObjectData } from "./classifyObjectData";

/**
 * Transforma un array de objetos o un solo objeto en un array de nodos.
 * Maneja objetos y arreglos anidados con niveles jerárquicos.
 *
 * @param {Array|Object} inputData - Datos de entrada, array u objeto.
 * @returns {Array} nodeArray - Array de nodos transformados.
 */
export function transformToNodeArray(inputData) {
  const dataArray = Array.isArray(inputData) ? inputData : [inputData];

  if (
    dataArray.length === 0 ||
    !dataArray.every((item) => typeof item === "object" && item !== null)
  ) {
    throw new Error(
      "inputData debe ser un array de objetos no vacíos o un solo objeto."
    );
  }

  const nodeArray = [];

  /**
   * Procesa un objeto o array y agrega sus nodos con niveles.
   *
   * @param {Object} obj - Objeto actual.
   * @param {string|null} parentId - ID del nodo padre.
   * @param {string} typoData - Tipo de nodo.
   * @param {number} level - Nivel jerárquico actual.
   */
  function processObject(obj, parentId = null, typoData = "nodo", level = 0) {
    const { nodeData, nestedObjects, nestedArrays } = classifyObjectData(obj);
    const NodeDimensions = calculateNodeDimensions(nodeData);

    // Nodo principal
    const mainNode = {
      id: uuidv4(),
      visible: true,
      height: NodeDimensions.height,
      width: NodeDimensions.width,
      type: parentId === null ? "nodo" : typoData,
      data: nodeData,
      parentId,
      level, // Asignar nivel
    };

    nodeArray.push(mainNode);

    // Procesar objetos anidados
    nestedObjects.forEach(({ key, value }) => {
      const nestedNodeDimention = calculateNestedNodeDimensions(key);
      const nestedNode = {
        id: uuidv4(),
        visible: true,
        btnVisible: true,
        height: nestedNodeDimention.height,
        width: nestedNodeDimention.width,
        type: typoData ?? "Object",
        data: { name: key },
        parentId: mainNode.id,
        level: level + 1, // Incrementar nivel
      };

      nodeArray.push(nestedNode);
      processObject(value, nestedNode.id, "ElementObject", level + 1);
    });

    // Procesar arreglos anidados
    nestedArrays.forEach(({ key, value }) => {
      if (value.length > 0) {
        const nestedNodeDimention = calculateNestedNodeDimensions(key);
        const arrayNode = {
          id: uuidv4(),
          visible: true,
          btnVisible: true,
          height: nestedNodeDimention.height,
          width: nestedNodeDimention.width,
          type: "Array",
          data: { name: key },
          parentId: mainNode.id,
          level: level + 1, // Incrementar nivel
        };

        nodeArray.push(arrayNode);

        value.forEach((element) => {
          if (typeof element === "object" && !Array.isArray(element)) {
            processObject(element, arrayNode.id, "ObjectObject", level + 2);
          } else if (Array.isArray(element)) {
            const nestedArrayNodeDimention =
              calculateNestedNodeDimensions("Array");
            const nestedArrayNode = {
              id: uuidv4(),
              visible: true,
              btnVisible: true,
              height: nestedArrayNodeDimention.height,
              width: nestedArrayNodeDimention.width,
              type: "Array",
              data: { name: "Array" },
              parentId: arrayNode.id,
              level: level + 2, // Incrementar nivel
            };

            nodeArray.push(nestedArrayNode);
            element.forEach((nestedElement) => {
              if (
                typeof nestedElement === "object" &&
                !Array.isArray(nestedElement)
              ) {
                processObject(
                  nestedElement,
                  nestedArrayNode.id,
                  "ObjectObject",
                  level + 3
                );
              } else if (
                typeof nestedElement === "string" ||
                typeof nestedElement === "number"
              ) {
                const nestedElementDimention = calculateNestedNodeDimensions(
                  nestedElement.toString()
                );
                const nestedElementNode = {
                  id: uuidv4(),
                  visible: true,
                  height: nestedElementDimention.height,
                  width: nestedElementDimention.width,
                  type: "ElementArray",
                  data: { value: nestedElement },
                  parentId: nestedArrayNode.id,
                  level: level + 3, // Incrementar nivel
                };
                nodeArray.push(nestedElementNode);
              }
            });
          } else if (
            typeof element === "string" ||
            typeof element === "number"
          ) {
            const nestedNodeDimention = calculateNestedNodeDimensions(
              element.toString()
            );
            const elementNode = {
              id: uuidv4(),
              visible: true,
              height: nestedNodeDimention.height,
              width: nestedNodeDimention.width,
              type: "ElementArray",
              data: { value: element },
              parentId: arrayNode.id,
              level: level + 2, // Incrementar nivel
            };
            nodeArray.push(elementNode);
          }
        });
      }
    });
  }

  // Procesar cada objeto en el array
  dataArray.forEach((obj) => processObject(obj));

  return nodeArray;
}
