import "../style/Header.css";
import Input from "./Input";
import CustomButton from "./CustomButton";
import CustomSelect from "./CustomSelect";
import CustomFlyoutMenu from "./CustomFlyoutMenu";
import { cmbs } from "../constant/constant";
import { PlayCircleIcon, PhoneIcon } from "@heroicons/react/24/outline";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import SavingsIcon from "@mui/icons-material/Savings";
import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import GetAppIcon from "@mui/icons-material/GetApp";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import DataObjectIcon from "@mui/icons-material/DataObject";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CodeIcon from "@mui/icons-material/Code";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import CompareIcon from "@mui/icons-material/Compare";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PublicIcon from "@mui/icons-material/Public";
import { useState, useCallback } from "react";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";

const data = cmbs.typeFile;
const file = [
  {
    name: "Import",
    icon: UploadFileIcon,
  },
  {
    name: "Export",
    icon: GetAppIcon,
  },
];
const view = [
  {
    name: "Rotate Layout",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: AccountTreeIcon,
  },
  {
    name: "Collapse Graph",
    description: "Speak directly to your customers",
    href: "#",
    icon: FilterNoneIcon,
  },
  {
    name: "Focus to first node",
    description: "Speak directly to your customers",
    href: "#",
    icon: GpsFixedIcon,
  },
];

const tools = [
  {
    name: "JSON Query (jq)",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ManageSearchIcon,
  },
  {
    name: "JSON Schema",
    description: "Speak directly to your customers",
    href: "#",
    icon: DataObjectIcon,
  },
  {
    name: "JSON Path",
    description: "Speak directly to your customers",
    href: "#",
    icon: FilterAltIcon,
  },
  {
    name: "Decode JWT",
    description: "Speak directly to your customers",
    href: "#",
    icon: CodeIcon,
  },
  {
    name: "Generate Type",
    description: "Speak directly to your customers",
    href: "#",
    icon: TextSnippetIcon,
  },
  {
    name: "Randomize Data",
    description: "Speak directly to your customers",
    href: "#",
    icon: ShuffleIcon,
  },
  {
    name: "REST Client",
    description: "Speak directly to your customers",
    href: "#",
    icon: PublicIcon,
  },
  {
    name: "AI-Powered Filter",
    description: "Speak directly to your customers",
    href: "#",
    icon: AutoFixHighIcon,
  },
  {
    name: "Compare Data",
    description: "Speak directly to your customers",
    href: "#",
    icon: CompareIcon,
  },
];

const callsToAction = [
  { name: "Grahp", href: "#", icon: PlayCircleIcon },
  { name: "Tree", href: "#", icon: PhoneIcon },
];

const Header = () => {
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
      <div class="header-left-items">
        {/* img */}
        <CustomSelect options={data}></CustomSelect>
        <CustomFlyoutMenu title={"File"} options={file}></CustomFlyoutMenu>
        <CustomFlyoutMenu
          title={"View"}
          options={view}
          tabOptions={callsToAction}
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
