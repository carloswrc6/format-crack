// src/components/CustomNode.js
import React from "react";

const CustomNode = ({ event }) => {
  return (
    <foreignObject height={event.height} width={event.width} x={0} y={0}>
      <div
        style={{
          padding: 10,
          textAlign: "center",
          // background: "white",
        }}
      >
        <h3
          style={{
            color: "white",
            textAlign: "left",
          }}
        >
          {/* Recorriendo las claves y valores, excluyendo arrays y objetos */}
          {Object.entries(event.node.data).map(([key, value], index) => {
            if (
              typeof value === "string" ||
              typeof value === "number" ||
              typeof value === "boolean"
            ) {
              return (
                <div key={index}>
                  <strong style={{ color: "aqua" }}>{key}:</strong>
                  <strong style={{ color: "black" }}>
                    {` "` + value.toString() + `" `}
                  </strong>
                </div>
              );
            }
            return null;
          })}
        </h3>
      </div>
    </foreignObject>
  );
};

export default CustomNode;
