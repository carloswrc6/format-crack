import React, { useState, useEffect } from "react";
import { Canvas, Node } from "reaflow";
import data from "../mocks/archivoJson.json";
import { generateLinks } from "../utils/generateLink";
import { transformToNodeArray } from "../utils/transformData";
import CustomNode from "../components/CustomNode";
import { validateAndParseJson } from "../utils/validateJson";
import MonacoEditor from "../components/MonacoEditor";
import useResize from "../hooks/useRecize";
import { Space } from "react-zoomable-ui";
import "../style/Main.css";

const Main = () => {
  const [content, setContent] = useState("");
  const [nodes, setNodes] = useState(transformToNodeArray(data));
  const [edges, setEdges] = useState(generateLinks(nodes));

  // Custom hook for resizing
  const [width, resizerRef, handleMouseDown] = useResize(30, 25, 85);

  // Efecto para procesar el JSON del editor cuando cambia el contenido
  useEffect(() => {
    const result = validateAndParseJson(content);
    if (result.status) {
      const updatedNodes = transformToNodeArray(result.json);
      setNodes(updatedNodes);
      setEdges(generateLinks(updatedNodes));
    } else {
      console.error("Error:", result.error);
    }
  }, [content]);

  return (
    <div className="content">
      <div className="monaco-editor" style={{ width: `${width}%` }}>
        <MonacoEditor content={content} onContentChange={setContent} />
      </div>
      <div className="resizer" ref={resizerRef} onMouseDown={handleMouseDown} />
      <div
        id="canvas-content"
        style={{
          width: `${100 - width}%`,
          position: "relative",
          height: "100%", // Asegura que el contenedor ocupe toda la altura disponible
        }}
      >
        <Space
          style={{
            width: "100%",
            height: "100%",
          }}
          centerContent={true} // Centra el contenido dentro del Space
        >
          <Canvas
            direction="RIGHT"
            readonly={true}
            fit={true}
            zoom={false}
            nodes={nodes}
            edges={edges}
            node={<Node>{(event) => <CustomNode event={event} />}</Node>}
            onLayoutChange={(layout) => console.log("Layout changed", layout)}
            maxWidth={2000} // Ajusta este valor según tus necesidades
            maxHeight={650} // Ajusta este valor según tus necesidades
          />
        </Space>
      </div>
    </div>
  );
};

export default Main;
