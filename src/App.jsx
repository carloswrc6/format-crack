import React from "react";
import nodeData from "../src/mocks/archivoJson.json";
import Diagram from "../src/components/Diagram";

const App = () => {
  return (
    <div style={{ backgroundColor: "#1E1E1E", padding: "20px" }}>
      <svg width="100vw" height="100vw">
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,10 L10,5 z" fill="gray" />
          </marker>
        </defs>
        {/* Comprobar si nodeData es un array y renderizar todos los nodos */}
        {Array.isArray(nodeData) ? (
          nodeData.map((node, index) => (
            <Diagram key={node.id} data={node} x={100} y={300 + index * 250} /> // Ajustar posición
          ))
        ) : (
          <Diagram data={nodeData} x={100} y={300} />
        )}
      </svg>
    </div>
  );
};

export default App;
