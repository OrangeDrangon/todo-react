import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import "./Search.scss";

function Search() {
  return <Dropdown options={["one", "two", "three"]} />;
}

export default Search;
