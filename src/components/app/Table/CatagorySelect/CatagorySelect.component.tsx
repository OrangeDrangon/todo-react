import React from "react";
import Dropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";

import "./CatagorySelect.scss";

function CatagorySelect() {
  const onChange = (selected: Option) => {
    console.log(selected);
  };
  return <Dropdown options={["one", "two", "three"]} onChange={onChange} />;
}

export default CatagorySelect;
