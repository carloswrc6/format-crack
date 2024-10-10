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
const Footer = ({
  onEditorResizeToggle,
  editorValid,
  counterNodes,
  liveTransform,
  onLiveTransformToggle,
  onForceLiveTransformToggle,
}) => {
  const openGitHubDiscussions = () => {
    const githubDiscussionsUrl =
      "https://github.com/carloswrc6/format-crack/discussions";
    window.open(githubDiscussionsUrl, "_blank", "noopener,noreferrer");
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
          icon={liveTransform ? SyncIcon : SyncDisabledIcon}
          text={"Live Transform "}
          onClick={onLiveTransformToggle}
        />
        {!liveTransform && (
          <CustomButton
            icon={SlowMotionVideoIcon}
            text="Click to Transform"
            className="hover:bg-inherit"
            onClick={onForceLiveTransformToggle}
          />
        )}
      </div>
      <div className="footer-right-items">
        <CustomButton text={"Nodes: " + counterNodes} />
        <CustomButton
          icon={CommentIcon}
          text="Feedback"
          onClick={openGitHubDiscussions}
        />
      </div>
    </footer>
  );
};

export default Footer;
