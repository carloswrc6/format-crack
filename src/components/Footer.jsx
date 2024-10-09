import "../style/Footer.css";
import { useState } from "react";
import CustomButton from "./CustomButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import SyncIcon from "@mui/icons-material/Sync";
import SyncDisabledIcon from "@mui/icons-material/SyncDisabled";
import CommentIcon from "@mui/icons-material/Comment";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

const Footer = ({ onEditorResizeToggle, editorValid, counterNodes }) => {
  const [isSecondButtonVisible, setIsSecondButtonVisible] = useState(false);
  const handleFirstButtonClick = () => {
    setIsSecondButtonVisible(!isSecondButtonVisible); // Alternar visibilidad
  };
  return (
    <footer>
      <div className="footer-left-items">
        <CustomButton
          icon={SpaceDashboardIcon}
          onClick={onEditorResizeToggle}
        />
        <CustomButton
          icon={editorValid ? DoNotDisturbOnIcon : CheckCircleIcon}
          text={editorValid ? "Invalid" : "Valid"}
          className={editorValid ? "!text-red-500" : ""}
        />
        <CustomButton
          icon={isSecondButtonVisible ? SyncDisabledIcon : SyncIcon}
          text="Live Transform"
          onClick={handleFirstButtonClick}
        />
        {isSecondButtonVisible && (
          <CustomButton
            icon={SlowMotionVideoIcon}
            text="Click to Transform"
            className="hover:bg-inherit"
          />
        )}
      </div>
      <div className="footer-right-items">
        <CustomButton text={"Nodes: " + counterNodes} />
        <CustomButton icon={CommentIcon} text="Feedback" />
      </div>
    </footer>
  );
};

export default Footer;
