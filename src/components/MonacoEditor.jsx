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
