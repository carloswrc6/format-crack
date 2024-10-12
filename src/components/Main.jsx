import React, { useEffect, useState, useCallback } from "react";
import { Canvas, Node } from "reaflow";
import data from "../mocks/archivoJson.json";
import { generateLinks } from "../utils/generateLink";
import { transformToNodeArray } from "../utils/transformData";
import CustomNode from "../components/CustomNode";
import { validateAndParseJson } from "../utils/validateJson";
import MonacoEditor from "../components/MonacoEditor";
import { Space } from "react-zoomable-ui";
import "../style/Main.css";

const Main = ({
  width,
  resizerRef,
  handleMouseDown,
  onInvalidEditor,
  onCounterNodes,
  liveTransform,
  forceLiveTransform,
  selectedLanguage,
  content,
  onContentChange,
  direction,
}) => {
  const [nodes, setNodes] = useState(transformToNodeArray(data));
  const [edges, setEdges] = useState(generateLinks(nodes));
  const [previousContent, setPreviousContent] = useState("");
  const [key, setKey] = useState(0);

  useEffect(() => {
    if ((liveTransform && content !== previousContent) || forceLiveTransform) {
      const result = validateAndParseJson(content);
      if (result.status) {
        const updatedNodes = transformToNodeArray(result.json);
        setNodes(updatedNodes);
        setEdges(generateLinks(updatedNodes));
        onInvalidEditor(false);
        onCounterNodes(updatedNodes.length);
      } else {
        console.error("Error:", result.error);
        onInvalidEditor(true);
        onCounterNodes(0);
      }
      setPreviousContent(content);
    }
  }, [
    content,
    liveTransform,
    forceLiveTransform,
    onInvalidEditor,
    onCounterNodes,
  ]);

  useEffect(() => {
    // Forzar la actualización del Canvas cuando cambia la dirección
    setKey((prevKey) => prevKey + 1);
  }, [direction]);

  const handleValidationError = useCallback(
    (errorMessage) => {
      onInvalidEditor(errorMessage);
    },
    [onInvalidEditor]
  );

  const handleNodeDimensions = useCallback((id, width, height) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === id
          ? { ...node, width: Math.ceil(width), height: Math.ceil(height) }
          : node
      )
    );
  }, []);

  return (
    <div className="content">
      <div className="monaco-editor" style={{ width: `${width}%` }}>
        <MonacoEditor
          content={content}
          onContentChange={onContentChange}
          onValidationError={handleValidationError}
          language={selectedLanguage}
        />
      </div>
      <div className="resizer" ref={resizerRef} onMouseDown={handleMouseDown} />
      <div
        id="canvas-content"
        style={{
          width: `${100 - width}%`,
          position: "relative",
          height: "100%",
        }}
      >
        <Space
          style={{
            width: "100%",
            height: "100%",
          }}
          centerContent={true}
        >
          <Canvas
            key={key}
            direction={direction}
            readonly={true}
            fit={true}
            zoom={true}
            nodes={nodes}
            edges={edges}
            node={
              <Node>
                {(event) => (
                  <CustomNode
                    event={{
                      ...event,
                      setNodeHeight: (height) =>
                        handleNodeDimensions(
                          event.node.id,
                          event.width,
                          height
                        ),
                      setNodeWidth: (width) =>
                        handleNodeDimensions(
                          event.node.id,
                          width,
                          event.height
                        ),
                    }}
                  />
                )}
              </Node>
            }
            maxWidth={2000}
            maxHeight={2000}
          />
        </Space>
      </div>
    </div>
  );
};

export default Main;
