import React from 'react';

const nodeData = {
  id: 1,
  label: 'Node 1',
  children: [
    { id: 2, label: 'Node 22'  },
    { id: 3, label: 'Node 33' },
  ],
};

const Node = ({ x, y, label }) => {
  return (
    <g>
      <rect x={x} y={y} width="80" height="40" rx="5" ry="5" fill="white" stroke="black" />
      <text x={x + 40} y={y + 25} textAnchor="middle" fontSize="12">{label}</text>
    </g>
  );
};

const Line = ({ x1, y1, x2, y2 }) => {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="gray" strokeWidth="1" markerEnd="url(#arrow)" />
  );
};

const Diagram = ({ data }) => {
  const node1X = 100, node1Y = 50;
  const node2X = 50, node2Y = 150;
  const node3X = 150, node3Y = 150;

  return (
    <svg width="300" height="300">
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,10 L10,5 z" fill="gray" />
        </marker>
      </defs>
      <Node x={node1X} y={node1Y} label={data.label} />
      <Node x={node2X} y={node2Y} label={data.children[0].label} />
      <Node x={node3X} y={node3Y} label={data.children[1].label} />
      <Line x1={node1X + 40} y1={node1Y + 40} x2={node2X + 40} y2={node2Y} />
      <Line x1={node1X + 40} y1={node1Y + 40} x2={node3X + 40} y2={node3Y} />
    </svg>
  );
};

const App = () => {
  return (
    <div style={{ backgroundColor: '#1E1E1E', padding: '20px' }}>
      <Diagram data={nodeData} />
    </div>
  );
};

export default App;
