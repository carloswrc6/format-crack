import React, { useState } from "react";
import { Canvas, Node } from "reaflow";
import "./App.css";
import data from "./mocks/archivoJson3.json";
import { generateLinks } from "./composable/generateLink";
import { transformToNodeArray } from "./composable/transformData";

const App = () => {
  // const [nodes, setNodes] = useState([
  //   {
  //     id: "1",
  //     height: 125,
  //     width: 250,
  //     type: "nodo",
  //     data: {
  //       a: "a",
  //       b: "a",
  //       c: "a",
  //     },
  //   },
  //   {
  //     id: "2",
  //     height: 125,
  //     width: 250,
  //     type: "Object",
  //     data: {
  //       name: "objeto",
  //     },
  //   },
  //   {
  //     id: "3",
  //     height: 125,
  //     width: 250,
  //     type: "ObjectObject",
  //     data: {
  //       p1: "p1",
  //       p2: "p2",
  //       p3: "p3",
  //     },
  //   },
  //   {
  //     id: "4",
  //     height: 125,
  //     width: 250,
  //     type: "Array",
  //     data: {
  //       name: "array 1",
  //     },
  //   },
  //   {
  //     id: "5",
  //     height: 125,
  //     width: 250,
  //     type: "ArrayValue",
  //     data: {
  //       value: "array 1 d",
  //     },
  //   },
  //   {
  //     id: "6",
  //     height: 125,
  //     width: 250,
  //     type: "ArrayValue",
  //     data: {
  //       value: 2,
  //     },
  //   },
  //   {
  //     id: "7",
  //     height: 125,
  //     width: 250,
  //     type: "ArrayValue",
  //     data: {
  //       value: 3,
  //     },
  //   },
  //   {
  //     id: "8",
  //     height: 125,
  //     width: 250,
  //     type: "ArrayObject",
  //     data: {
  //       name: "arrayObjetos",
  //     },
  //   },
  //   {
  //     id: "9",
  //     height: 125,
  //     width: 250,
  //     type: "ObjectArray",
  //     data: {
  //       a: "arrayObjetos -pos 0- a",
  //       b: "a",
  //       c: "a",
  //     },
  //   },
  //   {
  //     id: "10",
  //     height: 125,
  //     width: 250,
  //     type: "ObjectArray",
  //     data: {
  //       a: "arrayObjetos -pos 1- a",
  //       b: "a",
  //       c: "a",
  //     },
  //   },
  // ]);

  const [nodes, setNodes] = useState(transformToNodeArray(data));
  console.log("nodes -> 1 ", JSON.stringify( nodes));
  console.log("nodes -> 2 ",   nodes );
  // const [edges, setEdges] = useState([
    // {
    //   id: "1-2",
    //   from: "1",
    //   to: "2",
    // },
    // {
    //   id: "2-3",
    //   from: "2",
    //   to: "3",
    // },
    // {
    //   id: "1-4",
    //   from: "1",
    //   to: "4",
    // },
    // {
    //   id: "4-5",
    //   from: "4",
    //   to: "5",
    // },
    // {
    //   id: "4-6",
    //   from: "4",
    //   to: "6",
    // },
    // {
    //   id: "4-7",
    //   from: "4",
    //   to: "7",
    // },
    // {
    //   id: "1-8",
    //   from: "1",
    //   to: "8",
    // },
    // {
    //   id: "8-9",
    //   from: "8",
    //   to: "9",
    // },
    // {
    //   id: "8-10",
    //   from: "8",
    //   to: "10",
    // },
  // ]);

  const [edges, setEdges] = useState(generateLinks(nodes));
  console.log("edges -> 1 ", JSON.stringify( edges));
  console.log("edges -> 1 ", JSON.stringify( edges));

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
        // Para evitar el click y que salgan lineas
        readonly={true}
        // Para centrar la img
        fit={true}
        // Para mover con el mouse
        panType="drag"
        nodes={nodes}
        edges={edges}
        // node={(p) => <CustomNode {...p} />}
        node={
          <Node>
            {(event) => (
              <foreignObject
                height={event.height}
                width={event.width}
                x={0}
                y={0}
              >
                <div
                  style={{
                    padding: 10,
                    textAlign: "center",
                  }}
                >
                  <h3
                    style={{
                      color: "white",
                    }}
                  >
                    {/* Recorriendo las claves y valores, excluyendo arrays y objetos */}
                    {Object.entries(event.node.data).map(
                      ([key, value], index) => {
                        // Verificar si el valor es primitivo
                        if (
                          typeof value === "string" ||
                          typeof value === "number" ||
                          typeof value === "boolean"
                        ) {
                          return (
                            <div key={index}>
                              <strong>{key}:</strong> {value.toString()}
                            </div>
                          );
                        }
                        // No renderizar si es un array u objeto
                        return null;
                      }
                    )}
                  </h3>
                </div>
              </foreignObject>
            )}
          </Node>
        }
        onLayoutChange={(layout) => console.log("Cambio el Layout", layout)}
      />
    </div>
  );
};
export default App;
