import "../style/CustomButton.css";

const CustomButton = ({ icon: Icon, text, className = "", onClick }) => {
  return (
    <button
      className={`bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-2 flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon className={`h-1 w-1 ${text ? "mr-2" : ""}`} />}
      <span className="text-xs">{text}</span>
    </button>
  );
};

export default CustomButton;
