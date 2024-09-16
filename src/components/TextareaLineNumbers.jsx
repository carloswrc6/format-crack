import React, { useState } from "react";

const TextareaWithLineNumbers = () => {
  const [content, setContent] = useState("");

  // Función para contar las líneas del contenido
  const countLines = (text) => {
    return text.split("\n").length;
  };

  // Manejar el cambio en el contenido del textarea
  const handleChange = (e) => {
    setContent(e.target.value);
  };

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
