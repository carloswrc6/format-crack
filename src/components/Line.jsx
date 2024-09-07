const Line = ({ x1, y1, x2, y2 }) => {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="gray" strokeWidth="1" markerEnd="url(#arrow)" />
  );
};
export default Line