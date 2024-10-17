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
  collapseGraph,
}) => {
  const [nodes, setNodes] = useState(transformToNodeArray(data, collapseGraph));
  const [edges, setEdges] = useState(generateLinks(nodes));
  const [previousContent, setPreviousContent] = useState("");
  const [key, setKey] = useState(0);
  const [visibleNode, setVisibleNode] = useState(0);

  useEffect(() => {
    console.log(" useEffect -> algo cambio ");
    if (
      (liveTransform && content !== previousContent) ||
      forceLiveTransform ||
      collapseGraph
    ) {
      const result = validateAndParseJson(content);
      if (result.status) {
        console.log(" useEffect -> collapseGraph ", collapseGraph);
        const updatedNodes = transformToNodeArray(result.json, collapseGraph);
        console.log(" useEffect -> updatedNodes ", updatedNodes);
        setNodes(updatedNodes);
        setEdges(generateLinks(updatedNodes));
        console.log(" useEffect -> edges ", edges);

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
    collapseGraph,
  ]);

  useEffect(() => {
    console.log(" useEffect -> algo cambio x2 ");
    if (visibleNode) {
      // setNodes(nodes);
      console.log(" nodes -> ", nodes);
      setEdges(generateLinks(nodes.filter((e) => e.visible === true)));
      console.log(" useEffect -> edges ", edges);
    }
  }, [visibleNode]);

  useEffect(() => {
    // Forzar la actualización del Canvas cuando cambia la dirección
    setKey((prevKey) => prevKey + 1);
  }, [direction, collapseGraph]);

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

  const handleNodeUpdate = useCallback((nodeId, updates) => {
    console.log("handleNodeUpdate ->", nodeId, updates);

    setNodes((prevNodes) => {
      // Copiar los nodos actuales
      let auxNodes = [...prevNodes];

      // Encuentra los hijos del nodo padre
      auxNodes = auxNodes.map((node) =>
        node.parentId === nodeId
          ? { ...node, visible: !node.visible } // Cambia la visibilidad de los hijos
          : node
      );

      console.log("auxNodes ->", auxNodes);

      return auxNodes;
    });

    // Incrementar el conteo de nodos visibles
    setVisibleNode((prevCount) => prevCount + 1);
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
            nodes={nodes.filter((e) => e.visible === true)}
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
                    onNodeUpdate={handleNodeUpdate}
                  />
                )}
              </Node>
            }
            maxWidth={2000}
            maxHeight={650}
          />
        </Space>
      </div>
    </div>
  );
};

export default Main;
