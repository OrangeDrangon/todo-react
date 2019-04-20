import React, { useState } from "react";
import { Modal, IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Dropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";

import "./CatagorySelect.scss";
import AddCatagory from "./AddCatagory/AddCatagory.component";
import { useCatagories } from "src/hooks/useCatagories.hook";

function CatagorySelect({
  onChange,
  name,
  setName
}: {
  onChange: (selected: Option) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { catagories, addCatagory } = useCatagories();
  const [open, setOpen] = useState(false);

  return (
    <div className="CatagorySelect-Container">
      <Dropdown
        className="CatagorySelect-Dropdown"
        options={catagories}
        onChange={onChange}
        value={name}
      />
      <IconButton color="primary" onClick={() => setOpen(true)}>
        <Add />
      </IconButton>
      <Modal
        children={
          <AddCatagory
            submit={(catagory: string) => {
              if (catagory.length > 0 && !catagories.includes(catagory)) {
                addCatagory(catagory);
                setName(catagory);
                setOpen(false);
              }
            }}
            setOpen={setOpen}
          />
        }
        open={open}
        onBackdropClick={() => setOpen(false)}
        onEscapeKeyDown={() => setOpen(false)}
        disableAutoFocus={true}
      />
    </div>
  );
}

export default CatagorySelect;
