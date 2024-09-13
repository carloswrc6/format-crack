// src/components/CustomNode.js
import React from "react";

const CustomNode = ({ event }) => {
  return (
    <foreignObject height={event.height * 2} width={event.width} x={0} y={-20}>
      <div
        style={{
          paddingLeft: "17px",
          // marginLeft: "20px",
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
                    {/* {` "` + event.height + `" `} */}
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
