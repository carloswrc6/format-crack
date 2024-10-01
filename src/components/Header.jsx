import "../style/Header.css";
import Input from "./Input";
import CustomButton from "./CustomButton";
import Select from "./CustomSelect";
import CustomFlyoutMenu from "./CustomFlyoutMenu";
import { cmbs } from "../constant/constant";
import {
  ChartPieIcon,
  CursorArrowRaysIcon,
  PlayCircleIcon,
  PhoneIcon,
  CloudArrowUpIcon,
  CloudArrowDownIcon,
} from "@heroicons/react/24/outline";
const data = cmbs.typeFile;
const file = [
  {
    name: "Import",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Export",
    icon: CloudArrowDownIcon,
  },
];
const view = [
  {
    name: "Rotate Layout",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Collapse Graph",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Focus to first node",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
];

const tools = [
  {
    name: "JSON Query (jq)",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "JSON Schema",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "JSON Path",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },

  {
    name: "AI-Powered Filter",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Decide JWT",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Generate Type",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Randomize Data",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Compare Data",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
];

const callsToAction = [
  { name: "Grahp", href: "#", icon: PlayCircleIcon },
  { name: "Tree", href: "#", icon: PhoneIcon },
];

const Header = () => {
  return (
    <header>
      <div class="left-items">
        {/* img */}
        <Select options={data}></Select>
        <CustomFlyoutMenu title={"File"} options={file}></CustomFlyoutMenu>
        <CustomFlyoutMenu
          title={"View"}
          options={view}
          tabOptions={callsToAction}
        ></CustomFlyoutMenu>
        <CustomFlyoutMenu title={"Tools"} options={tools}></CustomFlyoutMenu>
      </div>
      <div class="right-items">
        {/* <Input></Input> */}
        {/* <CustomButton></CustomButton> */}
        {/* <CustomButton></CustomButton> */}
        {/* <CustomButton></CustomButton> */}
      </div>
    </header>
  );
};

export default Header;
