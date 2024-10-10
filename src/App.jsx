import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import useResize from "./hooks/useRecize";

const App = () => {
  const [width, resizerRef, handleMouseDown, setWidth] = useResize(30, 25, 85);
  const [counterNodes, setCounterNodes] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);
  const [invalidEditor, setInvalidEditor] = useState(false);
  const [liveTransform, setLiveTransform] = useState(true);
  const [forceLiveTransform, setForceLiveTransform] = useState(false);

  const toggleResize = () => {
    if (isMaximized) {
      setWidth(30);
    } else {
      setWidth(0);
    }
    setIsMaximized(!isMaximized);
  };

  const handleLiveTransformToggle = () => {
    setLiveTransform(!liveTransform);
  };
  const handleForceLiveTransformToggle = () => {
    setForceLiveTransform(true);
    setTimeout(() => {
      setForceLiveTransform(false);
    }, 0);
  };

  return (
    <div className="App">
      <Header />
      <Main
        width={width}
        resizerRef={resizerRef}
        handleMouseDown={handleMouseDown}
        onInvalidEditor={setInvalidEditor}
        onCounterNodes={setCounterNodes}
        liveTransform={liveTransform}
        forceLiveTransform={forceLiveTransform}
      />
      <Footer
        onEditorResizeToggle={toggleResize}
        editorValid={invalidEditor}
        counterNodes={counterNodes}
        liveTransform={liveTransform}
        onLiveTransformToggle={handleLiveTransformToggle}
        onForceLiveTransformToggle={handleForceLiveTransformToggle}
      />
    </div>
  );
};

export default App;
