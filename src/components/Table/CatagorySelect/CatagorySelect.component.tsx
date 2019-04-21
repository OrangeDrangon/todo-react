import React from "react";
import Dropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";

import classes from "./CatagorySelect.module.scss";
import AddCatagory from "./AddCatagory/AddCatagory.component";
import { Catagory, ICatagory } from "../../../utils/database.util";

function CatagorySelect({
  onChange,
  catagory,
  setCatagory,
  catagories,
  addCatagory
}: {
  onChange: (selected: Option) => void;
  catagory: Catagory | null;
  setCatagory: React.Dispatch<React.SetStateAction<Catagory | null>>;
  catagories: Catagory[];
  addCatagory: (data: ICatagory) => Promise<Catagory>;
}) {
  const option = catagory
    ? {
        label: catagory.label,
        value: catagory.value
      }
    : "";

  return (
    <div className={classes.container}>
      <Dropdown
        className={classes.dropdown}
        options={catagories}
        onChange={onChange}
        value={option}
      />
      <AddCatagory
        submit={async (label: string) => {
          const value = label.toLowerCase();
          if (
            label.length > 0 &&
            catagories.map(catagory => catagory.value).indexOf(value) === -1
          ) {
            const catagory = await addCatagory({ label, value });
            setCatagory(catagory);
            return true;
          } else {
            return false;
          }
        }}
      />
    </div>
  );
}

export default CatagorySelect;
