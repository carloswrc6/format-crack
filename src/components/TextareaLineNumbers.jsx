import React, { useState, useEffect } from "react";

const TextareaWithLineNumbers = ({ content, setContent }) => {
  // Función para contar las líneas del contenido
  const countLines = (text) => {
    return text.split("\n").length;
  };

  // Manejar el cambio en el contenido del textarea
  const handleChange = (e) => {
    console.log(" CONTENIDO1 -> ", content);
    console.log(" handleChange -> ", e.target.value);
    setContent(e.target.value);
    console.log(" CONTENIDO2 -> ", content);
  };
  // Efecto para ver cuando content cambia
  useEffect(() => {
    console.log("CONTENIDO actualizado -> ", content);
  }, [content]);
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      {/* Contenedor de los números de línea */}
      <div
        style={{
          textAlign: "right",
          paddingRight: "10px",
          userSelect: "none",
          color: "gray",
          fontFamily: "monospace",
          borderRight: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {
          // Generar los números de línea
          Array.from({ length: countLines(content) }).map((_, index) => (
            <div key={index}>{index + 1}</div>
          ))
        }
      </div>

      {/* Textarea para el contenido */}
      <textarea
        value={content}
        onChange={handleChange}
        style={{
          flex: 1,
          padding: "10px",
          fontFamily: "monospace",
          border: "none",
          outline: "none",
          resize: "none",
          overflowY: "hidden",
          lineHeight: "1.5",
        }}
        rows={countLines(content)}
      />
    </div>
  );
};

export default TextareaWithLineNumbers;
