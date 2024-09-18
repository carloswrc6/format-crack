import React, { useState, useRef, useEffect } from "react";
import { Canvas, Node } from "reaflow";
import "./App.css";
import data from "../src/mocks/archivoJson.json";
import { generateLinks } from "../src/utils/generateLink";
import { transformToNodeArray } from "../src/utils/transformData";
import CustomNode from "./components/CustomNode";
import { validateAndParseJson } from "../src/utils/validateJson";
import MonacoJSONEditor from "./components/MonacoJSONEditor";
import useResize from "../src/hooks/useRecize"; // Hook personalizado

const App = () => {
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
    <div className="App">
      {/* Editor */}
      <div
        className="section1"
        style={{ width: `${width}%`, backgroundColor: "#f0f0f0" }}
      >
        <MonacoJSONEditor content={content} onContentChange={setContent} />
      </div>

      {/* Resizer */}
      <div className="resizer" ref={resizerRef} onMouseDown={handleMouseDown} />

      {/* Canvas */}
      <div id="canvas-content" style={{ width: `${100 - width}%` }}>
        <Canvas
          direction="RIGHT"
          readonly={true}
          fit={true}
          panType="drag"
          nodes={nodes}
          edges={edges}
          node={<Node>{(event) => <CustomNode event={event} />}</Node>}
          onLayoutChange={(layout) => console.log("Layout changed", layout)}
        />
      </div>
    </div>
  );
};

export default App;
