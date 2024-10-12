/**
 * Calcula dinámicamente el ancho y la altura de un nodo basado en los datos del nodo.
 *
 * @param {Object} nodeData - Objeto con los datos del nodo, donde las claves son los nombres de los atributos y los valores son los valores correspondientes.
 * @returns {Object} - Un objeto con las propiedades `width` y `height` calculadas.
 */
export function calculateNodeDimensions(nodeData) {
  // Cálculo dinámico de la altura en función del número de claves
  const calculatedHeight =
    Object.keys(nodeData).length * 10 - Object.keys(nodeData).length * 2;

  // Cálculo dinámico del ancho en función de la concatenación de claves y valores
  const longestConcatenation = Object.entries(nodeData).reduce(
    (maxLength, [key, value]) => {
      // Calcula la longitud de la concatenación de la clave y el valor convertido a string
      const concatenatedLength = (key + value.toString()).length;
      // Devuelve la longitud mayor entre la actual y la longitud máxima previa
      return Math.max(maxLength, concatenatedLength);
    },
    0 // Valor inicial de la longitud máxima
  );

  // Ancho basado en la longitud de clave + valor concatenados
  const calculatedWidth =
    longestConcatenation * 10 + 50 - longestConcatenation * 2 + 50;

  // Retorna un objeto con el ancho y la altura calculados
  return {
    width: calculatedWidth,
    height: calculatedHeight,
  };
}

export function calculateNestedNodeDimensions(key) {
  const nestedNodeHeight = 28; // Altura fija para el nodo intermedio
  const nestedNodeWidth = (key.length + 5) * 10 + 70 - (key.length + 5) * 2; // Ancho basado en la longitud de la clave
  // Retorna un objeto con el ancho y la altura calculados
  return {
    width: nestedNodeWidth,
    height: nestedNodeHeight,
  };
}
