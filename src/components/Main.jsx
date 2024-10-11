import React, { useEffect, useState } from "react";
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
}) => {
  const [content, setContent] = useState("");
  const [nodes, setNodes] = useState(transformToNodeArray(data));
  const [edges, setEdges] = useState(generateLinks(nodes));
  const [previousContent, setPreviousContent] = useState("");

  useEffect(() => {
    if ((liveTransform && content !== previousContent) || forceLiveTransform) {
      const result = validateAndParseJson(content);
      if (result.status) {
        const updatedNodes = transformToNodeArray(result.json);
        setNodes(updatedNodes);
        setEdges(generateLinks(updatedNodes));
        onInvalidEditor(false);
        onCounterNodes(nodes.length);
      } else {
        console.error("Error:", result.error);
        onInvalidEditor(true);
        onCounterNodes(0);
      }
      setPreviousContent(content);
    }
  }, [content, liveTransform, forceLiveTransform]);

  const handleValidationError = (errorMessage) => {
    onInvalidEditor(errorMessage);
  };

  return (
    <div className="content">
      <div className="monaco-editor" style={{ width: `${width}%` }}>
        <MonacoEditor
          content={content}
          onContentChange={setContent}
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
            // onLayoutChange={(layout) => console.log("Layout changed", layout)}
            maxWidth={2000} // Ajusta este valor según tus necesidades
            maxHeight={650} // Ajusta este valor según tus necesidades
          />
        </Space>
      </div>
    </div>
  );
};

export default Main;
