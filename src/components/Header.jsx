import "../style/Header.css";
import { useState, useCallback } from "react";
import { cmbs } from "../constant/constant";
import Input from "./Input";
import CustomButton from "./CustomButton";
import CustomSelect from "./CustomSelect";
import CustomFlyoutMenu from "./CustomFlyoutMenu";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import SavingsIcon from "@mui/icons-material/Savings";
import SearchIcon from "@mui/icons-material/Search";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";

const typeFile = cmbs.typeFile;
const file = cmbs.fileActions;
const typeView = cmbs.typeView;
const view = cmbs.viewActions;
const tools = cmbs.toolActions;

const Header = ({ onLanguageChange }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error(
            `Error al intentar entrar en modo pantalla completa: ${err.message}`
          );
        });
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullscreen(false);
          })
          .catch((err) => {
            console.error(
              `Error al intentar salir del modo pantalla completa: ${err.message}`
            );
          });
      }
    }
  }, []);

  return (
    <header>
      <div className="header-left-items">
        <CustomSelect
          options={typeFile}
          onChange={(selected) => {
            console.log("Lenguaje seleccionado:", selected.value); // Agrega este log
            onLanguageChange(selected.value);
          }}
        />
        <CustomFlyoutMenu title={"File"} options={file}></CustomFlyoutMenu>
        <CustomFlyoutMenu
          title={"View"}
          options={view}
          tabOptions={typeView}
          className="max-w-60"
        ></CustomFlyoutMenu>
        <CustomFlyoutMenu
          title={"Tools"}
          options={tools}
          className="max-w-60"
        ></CustomFlyoutMenu>
      </div>
      <div class="header-right-items">
        <CustomButton
          icon={SavingsIcon}
          text="Unlock advanced features"
          className="py-2"
        />
        <Input icon={SearchIcon} text=""></Input>
        <CustomButton icon={DownloadForOfflineIcon} className="py-2" />
        <CustomButton icon={AccountCircleIcon} className="py-2" />
        <CustomButton icon={SettingsIcon} className="py-2" />
        <CustomButton
          icon={isFullscreen ? ZoomInMapIcon : ZoomOutMapIcon}
          className="py-2"
          onClick={toggleFullscreen}
        />
      </div>
    </header>
  );
};

export default Header;
