import "../style/Footer.css";
import CustomButton from "./CustomButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CommentIcon from "@mui/icons-material/Comment";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

const Footer = () => {
  const handleFirstButtonClick = () => {
    console.log("First button clicked!");
    // Puedes agregar aquí la lógica que necesites
  };

  return (
    <footer>
      <div class="footer-left-items">
        <CustomButton
          icon={SpaceDashboardIcon}
          onClick={handleFirstButtonClick}
        />
        <CustomButton icon={CheckCircleIcon} text="Validd" />
        <CustomButton icon={ChangeCircleIcon} text="Live Transform" />
        <CustomButton icon={SlowMotionVideoIcon} text="Click to Transform" />
      </div>
      <div class="footer-right-items">
        <CustomButton text="Nodes:19" />
        <CustomButton icon={CommentIcon} text="Feedback" />
      </div>
    </footer>
  );
};

export default Footer;
