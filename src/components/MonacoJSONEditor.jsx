import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";

const MonacoJSONEditor = () => {
  const editorRef = useRef(null);
  const monacoEditorRef = useRef(null); // Para mantener referencia del editor de Monaco

  useEffect(() => {
    if (editorRef.current) {
      monacoEditorRef.current = monaco.editor.create(editorRef.current, {
        value: JSON.stringify(
          {
            "1valorPrimitivo": "valorPrimitivo",
            "2valorPrimitivo": "valorPrimitivo",
            "3valorPrimitivo": "valorPrimitivo",
            objeto: {
              name: "Eternal Flame",
              age: 1000000,
              secretIdentity: "Unknown",
              arrays: [
                { 1: 111, 12: 111, "1v": 111 },
                "222",
                "333",
                4,
                [
                  { 1: 111, 12: 111, 123: 111 },
                  "222",
                  "333",
                  4,
                  [{ 1: 1, 12: 1 }, "2", 3, 4],
                ],
              ],
            },
            arrayx: [["1", 111], "222", "333", 4],
          },
          null,
          2
        ),
        language: "json",
        theme: "vs-ligth",
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        wordWrap: "off",
      });
    }

    return () => {
      if (monacoEditorRef.current) {
        monacoEditorRef.current.dispose(); // Liberar recursos correctamente
      }
    };
  }, []);

  return (
    <div>
      <div ref={editorRef} style={{ height: "100vh", width: "100%" }} />
    </div>
  );
};

export default MonacoJSONEditor;
