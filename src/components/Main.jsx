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
  const [nodes, setNodes] = useState(transformToNodeArray(data));
  const [edges, setEdges] = useState(generateLinks(nodes));
  const [previousContent, setPreviousContent] = useState("");
  const [key, setKey] = useState(0);
  const [visibleNode, setVisibleNode] = useState(0);

  useEffect(() => {
    console.log(" useEffect -> algo cambio x44");
    if ((liveTransform && content !== previousContent) || forceLiveTransform) {
      const result = validateAndParseJson(content);
      if (result.status) {
        const updatedNodes = transformToNodeArray(result.json);
        setNodes(updatedNodes);
        setEdges(generateLinks(updatedNodes.filter((e) => e.visible === true)));
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
    console.log(" useEffect -> algo cambio x2 ");
    if (visibleNode) {
      setNodes(nodes);
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

      // Función recursiva para ocultar descendientes
      const hideDescendants = (parentId) => {
        // Encuentra todos los hijos inmediatos del nodo actual
        const children = auxNodes.filter((node) => node.parentId === parentId);

        // Cambia la visibilidad de los hijos y llama recursivamente a cada uno
        children.forEach((child) => {
          child.visible = updates.visible; // Cambiar visibilidad
          hideDescendants(child.id); // Llamada recursiva para los descendientes
        });
      };

      // Inicia el proceso desde el nodo padre proporcionado
      hideDescendants(nodeId);

      console.log("auxNodes ->", auxNodes);
      return auxNodes;
    });

    // Incrementar el conteo de nodos visibles
    setVisibleNode((prevCount) => prevCount + 1);
  }, []);

  useEffect(() => {
    console.log("useEffect collapseGraph ejecutado");

    // Crea una copia del estado actual de nodes
    let auxNodes = [...nodes];

    // Filtra los nodos que tienen `btnVisible` y están en `level === 1`
    const nodesWithBtnVisible = auxNodes.filter(
      (node) => node.btnVisible && node.level === 1
    );

    console.log("Nodos con btnVisible 1:", nodesWithBtnVisible);

    // Función recursiva para ocultar descendientes
    const hideDescendants = (parentId) => {
      // Encuentra todos los hijos inmediatos del nodo actual
      const children = auxNodes.filter((node) => node.parentId === parentId);

      // Cambia la visibilidad de los hijos y llama recursivamente a cada uno
      children.forEach((child) => {
        child.visible = false; // Cambiar visibilidad a false
        hideDescendants(child.id); // Llamada recursiva para los descendientes
      });
    };

    // Aplica `hideDescendants` a cada nodo con `btnVisible` en `level === 1`
    nodesWithBtnVisible.forEach((node) => {
      hideDescendants(node.id);
    });

    console.log("Nodos con btnVisible 2:", nodesWithBtnVisible);
    console.log(" auxNodes :", auxNodes);

    // Actualiza el estado de `nodes` con los cambios realizados en auxNodes
    setNodes(auxNodes);
    setEdges(generateLinks(auxNodes.filter((e) => e.visible === true)));
  }, [collapseGraph]);

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
