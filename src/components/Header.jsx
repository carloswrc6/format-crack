import "../style/Header.css";
import Input from "./Input";
import CustomButton from "./CustomButton";
import CustomSelect from "./CustomSelect";
import CustomFlyoutMenu from "./CustomFlyoutMenu";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid";

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
      <div class="header-left-items">
        {/* img */}
        <CustomSelect options={data}></CustomSelect>
        <CustomFlyoutMenu title={"File"} options={file}></CustomFlyoutMenu>
        <CustomFlyoutMenu
          title={"View"}
          options={view}
          tabOptions={callsToAction}
        ></CustomFlyoutMenu>
        <CustomFlyoutMenu title={"Tools"} options={tools}></CustomFlyoutMenu>
      </div>
      <div class="header-right-items">
        <CustomButton
          icon={MagnifyingGlassCircleIcon}
          text="Unlock advanced features"
          className="py-2"
        />
        <Input icon={MagnifyingGlassCircleIcon} text=""></Input>
        <CustomButton icon={MagnifyingGlassCircleIcon} className="py-2" />
        <CustomButton icon={MagnifyingGlassCircleIcon} className="py-2" />
        <CustomButton icon={MagnifyingGlassCircleIcon} className="py-2" />
      </div>
    </header>
  );
};

export default Header;
