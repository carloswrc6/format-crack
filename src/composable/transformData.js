import { v4 as uuidv4 } from "uuid";

export function transformToNodeArray(inputData) {
  console.log("inputData 1 ", inputData);
  console.log("inputData 1 length", inputData.length);

  let nodeArray = []; // Array para almacenar los nuevos objetos

  for (let i = 0; i < inputData.length; i++) {
    let currentObject = inputData[i]; // Obtenemos el objeto actual
    let nodeData = {}; // Crear el objeto `data` para almacenar las claves y valores

    // Iterar sobre las claves y valores del objeto actual
    for (const key in currentObject) {
      if (currentObject.hasOwnProperty(key)) {
        let value = currentObject[key];

        // Verificamos que el valor sea primitivo
        if (typeof value !== "object" || value === null) {
          // Si el valor es un tipo primitivo (string, number, boolean), lo añadimos
          nodeData[key] = value;
        }
      }
    }

    // Crear el objeto final con las propiedades adicionales
    let newNode = {
      id: uuidv4(), // id único
      height: 125, // Puedes ajustar estos valores según sea necesario
      width: 250,
      type: "nodo",
      data: nodeData, // Añadir el objeto con las claves y valores
    };

    nodeArray.push(newNode); // Añadir el nuevo nodo al array
  }

  return nodeArray;
}
