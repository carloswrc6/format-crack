const CustomButton = ({ icon: Icon, text }) => {
  return (
    <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold px-2 flex items-center justify-center">
      {Icon && <Icon className={`h-4 w-4 ${text ? "mr-2" : ""}`} />}
      <span className={"text-xs"}>{text}</span>
    </button>
  );
};

export default CustomButton;
