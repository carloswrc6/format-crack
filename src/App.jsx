import React, { useState } from "react";
import { Canvas, Node } from "reaflow";
import "./App.css";
const App = () => {
  const [nodes, setNodes] = useState([
    // {
    //   id: "1",
    //   // ancho y alto del bloque
    //   height: 125,
    //   width: 250,
    //   data: {
    //     value: 50,
    //   },
    // },
    // {
    //   id: "2",
    //   height: 125,
    //   width: 250,
    //   data: {
    //     value: 25,
    //   },
    // },
    {
      id: "1",
      height: 225,
      width: 250,
      data: {
        a: "a",
        b: "a",
        c: "a",
        objeto: {
          p1: "p1",
          p2: "p2",
          p3: "p3",
        },
        array: [1, 2, 3],
        arrayObjetos: [
          {
            a: "a",
            b: "a",
            c: "a",
          },
        ],
      },
    },
    {
      id: "2",
      height: 125,
      width: 250,
      data: {
        d: "a",
        e: "a",
        "f ": "a",
      },
    },
  ]);
  const [edges, setEdges] = useState([
    {
      id: "1-2",
      from: "1",
      to: "2",
    },
    // {
    //   id: "1-3",
    //   from: "1",
    //   to: "3",
    // },
  ]);
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
