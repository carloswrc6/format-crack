import Node from "./Node";
import Line from "./Line";

const Diagram = ({ data, x, y, level = 0 }) => {
  const nodeWidth = 80;
  const nodeHeight = 40;
  const horizontalSpacing = 250; // Espacio entre nodos horizontales
  const verticalSpacing = 200; // Espacio entre nodos verticales

  // Si el dato es un array, renderizar cada elemento con su propia posición
  if (Array.isArray(data)) {
    return (
      <g>
        {data.map((item, index) => {
          const newY = y + index * (nodeHeight + verticalSpacing); // Ajuste de posición para cada nodo
          return (
            <Diagram key={item.id} data={item} x={x} y={newY} level={level} />
          );
        })}
      </g>
    );
  }

  // Posición del nodo actual
  const nodeX = x;
  const nodeY = y;

  // Si el nodo tiene hijos, renderizar recursivamente
  let childY =
    y -
    (data.children ? ((data.children.length - 1) * verticalSpacing) / 2 : 0); // Centrar los hijos verticalmente
  return (
    <g>
      {/* Renderizar nodo actual */}
      <Node x={nodeX} y={nodeY} label={data.label} data={data} />

      {/* Renderizar hijos y líneas de conexión */}
      {data.children &&
        data.children.map((child, index) => {
          const childX = nodeX + horizontalSpacing;
          const childYPos = childY + index * verticalSpacing;
          return (
            <g key={child.id}>
              <Line
                x1={nodeX + nodeWidth}
                y1={nodeY + nodeHeight / 2}
                x2={childX}
                y2={childYPos + nodeHeight / 2}
              />
              <Diagram
                data={child}
                x={childX}
                y={childYPos}
                level={level + 1}
              />
            </g>
          );
        })}
    </g>
  );
};

export default Diagram;
