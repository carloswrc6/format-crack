import "../style/Header.css";
import React, { useState, useCallback } from "react";
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
const typeView = cmbs.typeView;
const view = cmbs.viewActions;
const tools = cmbs.toolActions;

const Header = ({
  onLanguageChange,
  onImport,
  onExport,
  onDirectionChange,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentDirection, setCurrentDirection] = useState(0);

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

  const rotateLayout = useCallback(() => {
    console.log(" rotateLayout ");
    const newDirectionIndex =
      (currentDirection + 1) % cmbs.nodeDirections.length;
    console.log(" newDirectionIndex ", newDirectionIndex);
    setCurrentDirection(newDirectionIndex);
    console.log(
      " onDirectionChange ",
      cmbs.nodeDirections[newDirectionIndex].value
    );
    onDirectionChange(cmbs.nodeDirections[newDirectionIndex].value);
  }, [currentDirection, onDirectionChange]);

  const handleViewAction = useCallback(
    (actionType) => {
      switch (actionType) {
        case "rotateLayout":
          rotateLayout();
          break;
        case "collapseGraph":
          console.log("Colapsar gráfico");
          break;
        case "focusFirstNode":
          console.log("Enfocar al primer nodo");
          break;
        default:
          break;
      }
    },
    [rotateLayout]
  );

  const fileActions = cmbs.fileActions.map((action) => ({
    ...action,
    action: action.action === "onImport" ? onImport : onExport,
  }));

  const viewOptions = view.map((action) => ({
    ...action,
    onClick: () => handleViewAction(action.action),
    description:
      action.action === "rotateLayout"
        ? `Dirección actual: ${cmbs.nodeDirections[currentDirection].name}`
        : action.description,
  }));

  return (
    <header>
      <div className="header-left-items">
        <CustomSelect
          options={typeFile}
          onChange={(selected) => {
            console.log("Lenguaje seleccionado:", selected.value);
            onLanguageChange(selected.value);
          }}
        />
        <CustomFlyoutMenu
          title={"File"}
          options={fileActions}
        ></CustomFlyoutMenu>
        <CustomFlyoutMenu
          title={"View"}
          options={viewOptions}
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
