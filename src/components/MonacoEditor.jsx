import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";

const MonacoEditor = ({ content, onContentChange, onValidationError }) => {
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
        wordWrap: "off",
      });

      // Escuchar cambios en el contenido del editor
      monacoEditorRef.current.onDidChangeModelContent(() => {
        const newValue = monacoEditorRef.current.getValue();

        // Intentar parsear el contenido como JSON
        try {
          console.log("validando");
          JSON.parse(newValue);
          onValidationError(false);
          console.log("sin error");
        } catch (e) {
          console.log("con error");
          onValidationError(true);
        }

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
      <div ref={editorRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default MonacoEditor;
