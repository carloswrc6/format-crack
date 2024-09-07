import React from 'react';

// Datos con estructura de árbol
const nodeData = {
  id: 1,
  label: 'Node 1',
  a: 'a',
  ab: 'ab',
  abc: 'abc',
  n: 3,
  active: false,
  children: [
    {
      id: 2,
      label: 'Node 22',
      children: [
        { id: 4, label: 'Node 222' },
        { id: 5, label: 'Node 333' },
      ],
    },
    { id: 3, label: 'Node 33' },
  ],
};

// Componente Node
const Node = ({ x, y, label }) => {
  return (
    <g>
      <rect x={x} y={y} width="80" height="40" rx="5" ry="5" fill="white" stroke="black" />
      <text x={x + 40} y={y + 25} textAnchor="middle" fontSize="12">{label}</text>
    </g>
  );
};

// Componente Line para las conexiones
const Line = ({ x1, y1, x2, y2 }) => {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="gray" strokeWidth="1" markerEnd="url(#arrow)" />
  );
};

// Componente recursivo para el Diagrama
const Diagram = ({ data, x, y, level = 0 }) => {
  const nodeWidth = 80;
  const nodeHeight = 40;
  const horizontalSpacing = 150; // Espacio entre nodos horizontales
  const verticalSpacing = 100; // Espacio entre nodos verticales (ajustable para evitar superposiciones)

  // Posición del nodo actual
  const nodeX = x;
  const nodeY = y;

  // Si el nodo tiene hijos, renderizamos recursivamente
  let childY = y - (data.children ? (data.children.length - 1) * verticalSpacing / 2 : 0); // Centrar a los hijos verticalmente
  return (
    <g>
      {/* Renderizar nodo actual */}
      <Node x={nodeX} y={nodeY} label={data.label} />

      {/* Renderizar hijos y líneas de conexión */}
      {data.children && data.children.map((child, index) => {
        const childX = nodeX + horizontalSpacing;
        const childYPos = childY + index * verticalSpacing;
        return (
          <g key={child.id}>
            <Line x1={nodeX + nodeWidth} y1={nodeY + nodeHeight / 2} x2={childX} y2={childYPos + nodeHeight / 2} />
            {/* Renderizar el hijo recursivamente */}
            <Diagram data={child} x={childX} y={childYPos} level={level + 1} />
          </g>
        );
      })}
    </g>
  );
};

// Componente principal
const App = () => {
  return (
    <div style={{ backgroundColor: '#1E1E1E', padding: '20px' }}>
      <svg width="800" height="600">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,10 L10,5 z" fill="gray" />
          </marker>
        </defs>
        {/* Diagrama inicial, con posición inicial (x, y) */}
        <Diagram data={nodeData} x={100} y={300} />
      </svg>
    </div>
  );
};

export default App;
