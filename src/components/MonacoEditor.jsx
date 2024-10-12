import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";

const MonacoEditor = ({
  content,
  onContentChange,
  onValidationError,
  language,
}) => {
  console.log("MonacoEditor recibió lenguaje:", language); // Agrega este log

  const editorRef = useRef(null);
  const monacoEditorRef = useRef(null); // Mantener la referencia del editor de Monaco

  useEffect(() => {
    if (editorRef.current && !monacoEditorRef.current) {
      // Crear el editor una sola vez
      monacoEditorRef.current = monaco.editor.create(editorRef.current, {
        value: content || "", // Usar el contenido que viene de props
        language: language, // Usa el lenguaje proporcionado
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

        try {
          JSON.parse(newValue);
          onValidationError(false);
          monaco.editor.setModelMarkers(
            monacoEditorRef.current.getModel(),
            "owner",
            []
          );
        } catch (e) {
          onValidationError(true);

          const errorMatch = e.message.match(/at position (\d+)/);
          let errorPosition = errorMatch ? parseInt(errorMatch[1]) : 0;

          const model = monacoEditorRef.current.getModel();
          const { lineNumber, column } = model.getPositionAt(errorPosition);

          monaco.editor.setModelMarkers(model, "owner", [
            {
              startLineNumber: lineNumber,
              startColumn: column,
              endLineNumber: lineNumber,
              endColumn: column + 1,
              message: e.message,
              severity: monaco.MarkerSeverity.Error,
            },
          ]);
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

  // Efecto para actualizar el lenguaje cuando cambie
  useEffect(() => {
    if (monacoEditorRef.current) {
      monaco.editor.setModelLanguage(
        monacoEditorRef.current.getModel(),
        language
      );
    }
  }, [language]);

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
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* <div
        style={{
          padding: "5px 10px",
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #ccc",
          fontSize: "14px",
        }}
      >
        Lenguaje actual:{" "}
        <span style={{ fontWeight: "bold" }}>
          {language || "No seleccionado"}
        </span>
      </div> */}
      <div ref={editorRef} style={{ flexGrow: 1 }} />
    </div>
  );
};

export default MonacoEditor;
