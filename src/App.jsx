import React, { useState, useCallback } from "react";
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
  const [selectedLanguage, setSelectedLanguage] = useState("json");
  const [editorContent, setEditorContent] = useState("");
  const [graphDirection, setGraphDirection] = useState("RIGHT");
  const [collapseGraph, setCollapseGraph] = useState(false);

  const handleLanguageChange = (language) => {
    // console.log("Cambiando lenguaje a:", language); // Agrega este log
    setSelectedLanguage(language);
  };

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

  const handleImport = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,.xml,.yaml,.toml,.csv";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setEditorContent(event.target.result);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, []);

  const handleExport = useCallback(() => {
    const blob = new Blob([editorContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `export.${selectedLanguage}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [editorContent, selectedLanguage]);

  const handleDirectionChange = useCallback((newDirection) => {
    console.log("Se clickeo handleDirectionChange");
    setGraphDirection(newDirection);
  }, []);

  const handleViewOptionClick = useCallback(() => {
    console.log("handleViewOptionClick padre (antes)", collapseGraph);
    setCollapseGraph((prevState) => {
      console.log("Nuevo valor de collapseGraph:", !prevState);
      return !prevState;
    });
  }, []);

  return (
    <div className="App">
      <Header
        onLanguageChange={handleLanguageChange}
        onImport={handleImport}
        onExport={handleExport}
        onDirectionChange={handleDirectionChange}
        onViewOptionClick={handleViewOptionClick}
      />
      <Main
        width={width}
        resizerRef={resizerRef}
        handleMouseDown={handleMouseDown}
        onInvalidEditor={setInvalidEditor}
        onCounterNodes={setCounterNodes}
        liveTransform={liveTransform}
        forceLiveTransform={forceLiveTransform}
        selectedLanguage={selectedLanguage}
        content={editorContent}
        onContentChange={setEditorContent}
        direction={graphDirection}
        collapseGraph={collapseGraph}
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
