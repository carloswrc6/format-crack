import "../style/Header.css";
import Input from "./Input";
import CustomButton from "./CustomButton";
import Select from "./CustomSelect";
import CustomFlyoutMenu from "./CustomFlyoutMenu";
import { cmbs } from "../constant/constant";
const arrSelect = cmbs;
const Header = () => {
  return (
    <header>
      <div class="left-items">
        {/* img */}
        <Select></Select>
        <CustomFlyoutMenu></CustomFlyoutMenu>
        <CustomFlyoutMenu></CustomFlyoutMenu>
        <CustomFlyoutMenu></CustomFlyoutMenu>
      </div>
      <div class="right-items">
        <Input></Input>
        <CustomButton></CustomButton>
        {/* <CustomButton></CustomButton> */}
        {/* <CustomButton></CustomButton> */}
      </div>
    </header>
  );
};

export default Header;
