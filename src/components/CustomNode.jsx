import React from "react";
import "../style/CustomNode.css"; // Importar los estilos desde un archivo CSS

const CustomNode = ({ event }) => {
  // Función para renderizar los atributos del nodo
  const renderAttributes = (data) => {
    return Object.entries(data).map(([key, value], index) => {
      // Verificar si el valor es un tipo primitivo
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        return (
          <div key={index}>
            <strong className="key">{key}:</strong>
            <strong className="value">{` ${value} `}</strong>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <foreignObject height={event.height * 2} width={event.width} x={0} y={-20}>
      <div className="custom-node-container">
        <h3 className="custom-node-title">
          {renderAttributes(event.node.data)}
        </h3>
      </div>
    </foreignObject>
  );
};

export default CustomNode;
