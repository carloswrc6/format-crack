import React from "react";

const NodeBox = ({ data, x, y, width = 200, height = 120, title }) => {
  const boxStyle = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    border: "1px solid purple",
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#f8f8f8",
    fontFamily: "monospace",
    fontSize: "12px",
    overflow: "hidden",
  };

  const titleStyle = {
    fontWeight: "bold",
    marginBottom: "5px",
  };

  return (
    <div style={boxStyle}>
      {title && <div style={titleStyle}>{title}</div>}
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          {key}: {typeof value !== "object" ? JSON.stringify(value) : "..."}
        </div>
      ))}
    </div>
  );
};

const Arrow = ({ startX, startY, endX, endY }) => (
  <svg
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    }}
  >
    <defs>
      <marker
        id="arrowhead"
        markerWidth="10"
        markerHeight="7"
        refX="0"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill="blue" />
      </marker>
    </defs>
    <path
      d={`M${startX},${startY} C${(startX + endX) / 2},${startY} ${
        (startX + endX) / 2
      },${endY} ${endX},${endY}`}
      fill="none"
      stroke="blue"
      strokeWidth="2"
      markerEnd="url(#arrowhead)"
    />
  </svg>
);

const HorizontalNodeDisplay = ({ data, x = 0, y = 0 }) => {
  const nodeWidth = 200;
  const nodeHeight = 120;
  const horizontalGap = 250;
  const verticalGap = 150;

  const renderNode = (nodeData, nodeX, nodeY) => {
    const childNodes = Object.entries(nodeData).filter(
      ([_, v]) => typeof v === "object" && v !== null
    );

    return (
      <>
        <NodeBox
          data={nodeData}
          x={nodeX}
          y={nodeY}
          width={nodeWidth}
          height={nodeHeight}
        />
        {childNodes.map(([key, value], index) => {
          const isArray = Array.isArray(value);
          const childX = nodeX + horizontalGap;
          const childY = nodeY + index * verticalGap;
          const typeNodeY = childY + nodeHeight / 2 - 20;

          return (
            <React.Fragment key={key}>
              <Arrow
                startX={nodeX + nodeWidth}
                startY={nodeY + nodeHeight / 2}
                endX={childX - 60}
                endY={typeNodeY + 20}
              />
              <NodeBox
                data={{
                  [isArray ? "array" : "objeto"]: `(${
                    isArray ? value.length : Object.keys(value).length
                  })`,
                }}
                title={key}
                x={childX - 60}
                y={typeNodeY}
                width={120}
                height={40}
              />
              {isArray && typeof value[0] !== "object" ? (
                <NodeBox
                  data={Object.fromEntries(value.map((v, i) => [i, v]))}
                  x={childX + 80}
                  y={childY}
                  width={nodeWidth}
                  height={nodeHeight}
                />
              ) : (
                renderNode(value, childX + 80, childY)
              )}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return renderNode(data, x, y);
};

const NodeDisplay = ({ nodes }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "800px",
        overflow: "auto",
      }}
    >
      {nodes.map((node, index) => (
        <HorizontalNodeDisplay key={index} data={node} y={index * 400} />
      ))}
    </div>
  );
};

export default NodeDisplay;
