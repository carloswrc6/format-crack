const Node = ({ x, y, label, data }) => {
  return (
    <g >
      {/* Contenido blanco */}
      <rect x={x} y={y} width="80" height="40" rx="5" ry="5" fill="white" stroke="black" />
      {/* ubicacion del texto en el contenido blanco */}
      <text x={x + 40} y={y + 25} textAnchor="middle" fontSize="12">
        {label}
      </text>
      {/* todos los atributos */}
      <foreignObject x={x + 5} y={y + 35} width="100%" height="100%">
        <div>
          {Object.entries(data).map(([key, value]) => {
            if (!Array.isArray(value)) {
              return (
                <div key={key} >
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
export default Node