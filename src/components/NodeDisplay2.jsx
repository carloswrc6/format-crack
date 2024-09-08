import React from "react";

const NodeBox = ({ data, title }) => {
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

  const titleStyle = {
    fontWeight: "bold",
    marginBottom: "10px",
  };

  return (
    <div style={boxStyle}>
      {title && <div style={titleStyle}>{title}</div>}
      {Object.entries(data).map(([key, value]) => (
        <div key={key} style={itemStyle}>
          {key}: {typeof value !== "object" ? JSON.stringify(value) : "..."}
        </div>
      ))}
    </div>
  );
};

const Connection = ({ children }) => {
  const style = {
    display: "flex",
    alignItems: "center",
  };

  const lineStyle = {
    width: "20px",
    height: "2px",
    backgroundColor: "blue",
    margin: "0 5px",
  };

  return (
    <div style={style}>
      <div style={lineStyle}></div>
      {children}
    </div>
  );
};

const NestedNodeDisplay = ({ data, level = 0 }) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    marginLeft: `${level * 20}px`,
  };

  return (
    <div style={containerStyle}>
      <NodeBox data={data} />
      {Object.entries(data).map(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          const isArray = Array.isArray(value);
          return (
            <Connection key={key}>
              <div>
                <NodeBox
                  data={{
                    [isArray ? "array" : "objeto"]: `(${
                      Object.keys(value).length
                    })`,
                  }}
                  title={key}
                />
                {isArray && typeof value[0] !== "object" ? (
                  <NodeBox
                    data={Object.fromEntries(value.map((v, i) => [i, v]))}
                  />
                ) : (
                  <NestedNodeDisplay data={value} level={level + 1} />
                )}
              </div>
            </Connection>
          );
        }
        return null;
      })}
    </div>
  );
};

const NodeDisplay = ({ nodes }) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "800px",
  };

  return (
    <div style={containerStyle}>
      {nodes.map((node, index) => (
        <NestedNodeDisplay key={index} data={node} />
      ))}
    </div>
  );
};

export default NodeDisplay;
