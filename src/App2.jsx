import React from 'react';

// Datos con estructura de árbol
const nodeData = {
  id: 1,
  label: 'Node 1',
  children: [
    {
      id: 2,
      label: 'Node 22',
      children: [
        { id: 4, label: 'Node 222' , children: [
          { id: 4, label: 'Node 222' },
          { id: 5, label: 'Node 333' },
        ]},
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
  const verticalSpacing = 100;
  const horizontalSpacing = 120;

  // Posición del nodo actual
  const nodeX = x;
  const nodeY = y;

  // Si el nodo tiene hijos, renderizamos recursivamente
  let childX = x - (data.children ? (data.children.length - 1) * horizontalSpacing / 2 : 0);
  return (
    <g>
      {/* Renderizar nodo actual */}
      <Node x={nodeX} y={nodeY} label={data.label} />

      {/* Renderizar hijos y líneas de conexión */}
      {data.children && data.children.map((child, index) => {
        const childY = nodeY + verticalSpacing;
        const childXPos = childX + index * horizontalSpacing;
        return (
          <g key={child.id}>
            <Line x1={nodeX + nodeWidth / 2} y1={nodeY + nodeHeight} x2={childXPos + nodeWidth / 2} y2={childY} />
            {/* Renderizar el hijo recursivamente */}
            <Diagram data={child} x={childXPos} y={childY} level={level + 1} />
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
      <svg width="600" height="600">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,10 L10,5 z" fill="gray" />
          </marker>
        </defs>
        {/* Diagrama inicial, con posición inicial (x, y) */}
        <Diagram data={nodeData} x={300} y={50} />
      </svg>
    </div>
  );
};

export default App;
