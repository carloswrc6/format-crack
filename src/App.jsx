import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import useResize from "./hooks/useRecize";

const App = () => {
  const [width, resizerRef, handleMouseDown, setWidth] = useResize(30, 25, 85);
  const [isMaximized, setIsMaximized] = useState(false);
  const [invalidEditor, setInvalidEditor] = useState(false);

  const toggleResize = () => {
    if (isMaximized) {
      setWidth(30);
    } else {
      setWidth(0);
    }
    setIsMaximized(!isMaximized);
  };
  return (
    <div className="App">
      <Header></Header>
      <Main
        width={width}
        resizerRef={resizerRef}
        handleMouseDown={handleMouseDown}
        onInvalidEditor={setInvalidEditor}
      />
      <Footer onEditorResizeToggle={toggleResize} editorValid={invalidEditor} />
    </div>
  );
};

export default App;
