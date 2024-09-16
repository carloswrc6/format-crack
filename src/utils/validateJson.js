/**
 * Valida si un string tiene el formato correcto de un JSON.
 * @param {string} jsonString - El string que se va a validar.
 * @returns {object} Un objeto con `status` y `json` o `error` según el resultado.
 */
export function validateAndParseJson(jsonString) {
  try {
    // Intentamos convertir el string a un objeto JSON
    const jsonObject = JSON.parse(jsonString);

    // Si es exitoso, retornamos el objeto y un estado de éxito
    return { status: true, json: jsonObject };
  } catch (error) {
    // Si ocurre un error, retornamos un estado de fallo
    return { status: false, error: "Invalid JSON format" };
  }
}
