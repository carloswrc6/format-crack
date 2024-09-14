import React, { useState } from "react";
import { Canvas, Node } from "reaflow";
import "./App.css";
import data from "../src/mocks/archivoJson7.json";
import { generateLinks } from "../src/utils/generateLink";
import { transformToNodeArray } from "../src/utils/transformData";
import CustomNode from "./components/CustomNode";
const App = () => {
  const [nodes, setNodes] = useState(transformToNodeArray(data));
  const [edges, setEdges] = useState(generateLinks(nodes));
  console.log(" NODES -> ", JSON.stringify(nodes));
  console.log(" EDGES -> ", JSON.stringify(edges));
  // se debe de convertir el array de objetos a algo plano
  // para meter todo eso dentro de data
  return (
    <div
      id="canvas-content"
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
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
  );
};
export default App;
