import React from "react";
import nodeData from "../src/mocks/archivoJson.json";
import NodeDisplay from "../src/components/NodeDisplay";
import NodeDisplay2 from "../src/components/NodeDisplay2";
import NodeDisplay3 from "../src/components/NodeDisplay3";

const App = () => {
  return <NodeDisplay2 nodes={nodeData} />;
};

export default App;
