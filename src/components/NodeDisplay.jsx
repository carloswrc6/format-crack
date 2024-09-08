import React from "react";

const NodeBox = ({ data }) => {
  const boxStyle = {
    border: "1px solid purple",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px 0",
    backgroundColor: "#f8f8f8",
    fontFamily: "monospace",
    width: "100%",
    maxWidth: "300px",
  };

  const itemStyle = {
    margin: "5px 0",
    color: "purple",
  };

  return (
    <div style={boxStyle}>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} style={itemStyle}>
          {key}: {JSON.stringify(value)}
        </div>
      ))}
    </div>
  );
};

const NodeDisplay = ({ nodes }) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "300px",
  };

  return (
    <div style={containerStyle}>
      {nodes.map((node, index) => (
        <NodeBox key={index} data={node} />
      ))}
    </div>
  );
};

export default NodeDisplay;
