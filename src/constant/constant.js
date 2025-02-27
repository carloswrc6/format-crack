// fileActions
import UploadFileIcon from "@mui/icons-material/UploadFile";
import GetAppIcon from "@mui/icons-material/GetApp";
// viewActions
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
// toolActions
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import DataObjectIcon from "@mui/icons-material/DataObject";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CodeIcon from "@mui/icons-material/Code";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import CompareIcon from "@mui/icons-material/Compare";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PublicIcon from "@mui/icons-material/Public";

export const cmbs = {
  typeFile: [
    { name: "JSON", value: "json" },
    { name: "XML", value: "xml" },
    { name: "YAML", value: "yaml" },
    { name: "TOML", value: "toml" },
    { name: "CSV", value: "csv" },
  ],
  fileActions: [
    {
      name: "Import",
      icon: UploadFileIcon,
      action: "onImport",
    },
    {
      name: "Export",
      icon: GetAppIcon,
      action: "onExport",
    },
  ],
  typeView: [{ name: "Grahp" }, { name: "Tree" }],
  viewActions: [
    {
      name: "Rotate Layout",
      description: "",
      icon: AccountTreeIcon,
      action: "rotateLayout",
    },
    {
      name: "Collapse Graph",
      description: "",
      icon: FilterNoneIcon,
      action: "collapseGraph",
    },
    {
      name: "Focus to first node",
      description: "",
      icon: GpsFixedIcon,
      action: "focusFirstNode",
    },
  ],
  toolActions: [
    {
      name: "JSON Query (jq)",
      description: "",
      href: "#",
      icon: ManageSearchIcon,
    },
    {
      name: "JSON Schema",
      description: "",
      href: "#",
      icon: DataObjectIcon,
    },
    {
      name: "JSON Path",
      description: "",
      href: "#",
      icon: FilterAltIcon,
    },
    {
      name: "Decode JWT",
      description: "",
      href: "#",
      icon: CodeIcon,
    },
    {
      name: "Generate Type",
      description: "",
      href: "#",
      icon: TextSnippetIcon,
    },
    {
      name: "Randomize Data",
      description: "",
      href: "#",
      icon: ShuffleIcon,
    },
    {
      name: "REST Client",
      description: "",
      href: "#",
      icon: PublicIcon,
    },
    {
      name: "AI-Powered Filter",
      description: "",
      href: "#",
      icon: AutoFixHighIcon,
    },
    {
      name: "Compare Data",
      description: "",
      href: "#",
      icon: CompareIcon,
    },
  ],
  nodeDirections: [
    { name: "Derecha", value: "RIGHT" },
    { name: "Abajo", value: "DOWN" },
    { name: "Izquierda", value: "LEFT" },
    { name: "Arriba", value: "UP" },
  ],
};
