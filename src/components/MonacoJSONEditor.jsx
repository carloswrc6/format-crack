import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";

const MonacoJSONEditor = ({ content, onContentChange }) => {
  const editorRef = useRef(null);
  const monacoEditorRef = useRef(null); // Mantener la referencia del editor de Monaco

  useEffect(() => {
    if (editorRef.current && !monacoEditorRef.current) {
      // Crear el editor una sola vez
      monacoEditorRef.current = monaco.editor.create(editorRef.current, {
        value: content || "", // Usar el contenido que viene de props
        language: "json",
        theme: "vs-dark",
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        wordWrap: "on",
      });

      // Escuchar cambios en el contenido del editor
      monacoEditorRef.current.onDidChangeModelContent(() => {
        const newValue = monacoEditorRef.current.getValue();
        if (onContentChange) {
          onContentChange(newValue); // Notificar cambios al componente principal
        }
      });
    }

    // Limpiar recursos cuando el componente se desmonte
    return () => {
      if (monacoEditorRef.current) {
        monacoEditorRef.current.dispose(); // Liberar recursos correctamente
        monacoEditorRef.current = null; // Resetear la referencia
      }
    };
  }, []);

  // Actualizar el valor del editor cuando cambie el prop `content`
  useEffect(() => {
    if (monacoEditorRef.current) {
      const currentValue = monacoEditorRef.current.getValue();
      if (content !== currentValue) {
        monacoEditorRef.current.setValue(content || "");
      }
    }
  }, [content]);

  return (
    <div>
      <div ref={editorRef} style={{ height: "100vh", width: "100%" }} />
    </div>
  );
};

export default MonacoJSONEditor;
