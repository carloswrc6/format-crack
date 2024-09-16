import React, { useState, useRef, useEffect } from "react";
import { Canvas, Node } from "reaflow";
import "./App.css";
import data from "../src/mocks/archivoJson.json";
import { generateLinks } from "../src/utils/generateLink";
import { transformToNodeArray } from "../src/utils/transformData";
import CustomNode from "./components/CustomNode";
import TextareaWithLineNumbers from "./components/TextareaLineNumbers";
import { validateAndParseJson } from "../src/utils/validateJson";
const App = () => {
  const [content, setContent] = useState("");
  const [nodes, setNodes] = useState(transformToNodeArray(data));
  const [edges, setEdges] = useState(generateLinks(nodes));
  console.log(" NODES -> ", JSON.stringify(nodes));
  console.log(" EDGES -> ", JSON.stringify(edges));
  // se debe de convertir el array de objetos a algo plano
  // para meter todo eso dentro de data
  const [width, setWidth] = useState(50); // El ancho inicial de la primera sección en porcentaje
  const resizerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    // Calcula el nuevo ancho en porcentaje
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 40 && newWidth < 95) {
      setWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Efecto para ver cuando content cambia
  useEffect(() => {
    console.log("CONTENIDO actualizado app.jsx -> ", content);
    const result = validateAndParseJson(content);
    if (result.status) {
      console.log("JSON válido:", result.json);
      setNodes(transformToNodeArray(result.json));
      setEdges(generateLinks(nodes));
    } else {
      console.log("Error:", result.error);
    }
  }, [content]);

  return (
    <div className="App">
      <div
        className="section1"
        style={{
          width: `${width}%`,
          backgroundColor: "#f0f0f0",
          // padding: "20px",
        }}
      >
        {/* <h2>Sección 1</h2> */}
        {/* <p>Contenido de la primera sección</p> */}
        <TextareaWithLineNumbers
          content={content}
          setContent={setContent}
        ></TextareaWithLineNumbers>
      </div>
      <div className="resizer" ref={resizerRef} onMouseDown={handleMouseDown} />

      <div
        // className="section2"
        id="canvas-content"
        style={{
          width: `${100 - width}%`,
          // padding: "20px",
        }}
      >
        {/* <h2>Procesamiento de Información</h2> */}
        {/* <p>Contenido: {content}</p> */}
        <Canvas
          // maxWidth={"100vw"}
          // maxHeight={"100vh"}
          // Para mostrar por direccion
          direction="RIGHT"
          // Para evitar el click y que salgan lineas
          readonly={true}
          // Para centrar la img
          fit={true}
          // Para mover con el mouse
          panType="drag"
          nodes={nodes}
          edges={edges}
          node={<Node>{(event) => <CustomNode event={event} />}</Node>}
          onLayoutChange={(layout) => console.log("Cambio el Layout", layout)}
        />
      </div>
    </div>
  );
};

export default App;
