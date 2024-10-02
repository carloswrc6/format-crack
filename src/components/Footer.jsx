import "../style/Footer.css";
import CustomButton from "./CustomButton";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid";

const Footer = () => {
  return (
    <footer>
      <div class="left-items">
        <CustomButton icon={MagnifyingGlassCircleIcon} />
        <CustomButton icon={MagnifyingGlassCircleIcon} text="Valid" />
        <CustomButton icon={MagnifyingGlassCircleIcon} text="Live Transform" />
        <CustomButton
          icon={MagnifyingGlassCircleIcon}
          text="Click to Transform"
        />
      </div>
      <div class="right-items">
        <CustomButton text="Nodes:19" />
        <CustomButton icon={MagnifyingGlassCircleIcon} text="Feedback" />
      </div>
    </footer>
  );
};

export default Footer;
