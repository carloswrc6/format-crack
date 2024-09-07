const Node = ({ x, y, label, data }) => {
  // Calcular la cantidad de atributos (filtrando objetos y arrays)
  const primitiveAttributes = Object.entries(data).filter(
    ([key, value]) => typeof value !== "object" && !Array.isArray(value)
  );
  const attributeCount = primitiveAttributes.length;

  // Encontrar la clave y el valor con mayor longitud (solo valores primitivos)
  const longestKeyValue = primitiveAttributes.reduce(
    (acc, [key, value]) => {
      const length = `${key}: ${value}`.length;
      return length > acc.length ? { key, value, length } : acc;
    },
    { key: "", value: "", length: 0 }
  );

  // Definir ancho y altura dinámicos en base a los atributos
  const nodeWidth = Math.max(longestKeyValue.length * 8, 80); // Ancho mínimo de 80
  const nodeHeight = Math.max(attributeCount * 18 + 30, 40); // Altura basada en el número de atributos

  return (
    <g>
      {/* Contenido blanco */}
      <rect
        x={x}
        y={y}
        width={nodeWidth}
        height={nodeHeight}
        rx="5"
        ry="5"
        fill="white"
        stroke="black"
      />
      {/* ubicacion del texto en el contenido blanco */}
      {/* <text x={x + 40} y={y + 25} textAnchor="middle" fontSize="12">
        {label}
      </text> */}
      {/* todos los atributos */}
      {/* <foreignObject x={x + 5} y={y + 35} width="100%" height="100%"> */}
      <foreignObject x={x} y={y} width="100%" height="100%" fontSize="12">
        <div style={{ padding: "15px" }}>
          {Object.entries(data).map(([key, value]) => {
            if (!Array.isArray(value)) {
              return (
                <div key={key}>
                  {key}: {value}
                </div>
              );
            }
          })}
        </div>
      </foreignObject>
    </g>
  );
};
export default Node;
