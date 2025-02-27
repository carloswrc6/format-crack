import React, { useEffect, useRef, useState } from "react";
import "../style/CustomNode.css"; // Importar los estilos desde un archivo CSS
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";

const CustomNode = ({ event, onNodeUpdate }) => {
  const [height, setHeight] = useState(event.height);
  const [isVisible, setIsVisible] = useState(event.node.visible ?? true);
  const contentRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        if (contentHeight !== height) {
          setHeight(contentHeight);
          if (event.setNodeHeight) {
            event.setNodeHeight(contentHeight);
          }
        }
      }
    };

    updateHeight();

    // Observador de redimensionamiento
    const resizeObserver = new ResizeObserver(updateHeight);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, [event, height]);

  const renderAttributes = (data) => {
    if (!data) return null; // Si no hay datos, no renderizar nada
    return Object.entries(data).map(([key, value], index) => {
      // Verificar si el valor es un tipo primitivo
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        return (
          <div key={index}>
            <strong className="key">{key}:</strong>
            <strong className="value">{` ${value} `}</strong>
          </div>
        );
      }
      return null;
    });
  };

  const handleButtonClick = () => {
    const newVisibleState = !isVisible;
    setIsVisible(newVisibleState);
    console.log(" valor ", newVisibleState);
    if (onNodeUpdate) {
      console.log(" fiun ");
      onNodeUpdate(event.node.id, { visible: newVisibleState });
    }
  };

  if (!event || !event.node || !event.node.data) {
    return null; // Verifica que event y sus propiedades existen
  }

  return (
    <foreignObject width={event.width} height={height - 10} x={0} y={3}>
      <div ref={contentRef} className="custom-node-container">
        <div className="custom-node-content">
          <h3 className="custom-node-title">
            {renderAttributes(event.node.data)}
          </h3>
          {event.node.btnVisible && (
            <div
              className={`custom-node-icon ${isVisible ? "" : "opacity-50"}`}
              onClick={handleButtonClick}
            >
              {isVisible ? <LinkIcon /> : <LinkOffIcon />}
            </div>
          )}
        </div>
      </div>
    </foreignObject>
  );
};

export default CustomNode;
