import React from "react";
import nodeData from "../src/mocks/archivoJson.json";
import NodeDisplay from "../src/components/NodeDisplay";
import NodeDisplay2 from "../src/components/NodeDisplay2";
import NodeDisplay3 from "../src/components/NodeDisplay3";
import { Canvas } from "reaflow";

// const App = () => {
// return <NodeDisplay2 nodes={nodeData} />;
// };
const nodes = [
  {
    id: "1",
    text: "Node 1 Node 1 Node 1",
  },
  {
    id: "2",
    text: "Node 2",
  },
];

const edges = [
  {
    id: "1-2",
    from: "1",
    to: "2",
  },
];
const App = () => {
  // return <NodeDisplay2 nodes={nodeData} />;
  return <Canvas nodes={nodes} edges={edges} />;
};
export default App;
