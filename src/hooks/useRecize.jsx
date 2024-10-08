import { useState, useRef } from "react";

const useResize = (initialWidth = 30, minWidth = 25, maxWidth = 85) => {
  const [width, setWidth] = useState(initialWidth);
  const resizerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > minWidth && newWidth < maxWidth) {
      setWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return [width, resizerRef, handleMouseDown, setWidth];
};

export default useResize;
