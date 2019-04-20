import React, { useState } from "react";
import { Modal, IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Dropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";

import classes from "./CatagorySelect.module.scss";
import AddCatagory from "./AddCatagory/AddCatagory.component";
import { useCatagories } from "src/hooks/useCatagories.hook";
import { Catagory } from "src/utils/database.util";

function CatagorySelect({
  onChange,
  catagory,
  setCatagory
}: {
  onChange: (selected: Option) => void;
  catagory: Catagory | null;
  setCatagory: React.Dispatch<React.SetStateAction<Catagory | null>>;
}) {
  const { catagories, addCatagory } = useCatagories();
  const [open, setOpen] = useState(false);

  const option = catagory ? {
    label: catagory.label,
    value: catagory.value
  } : '';

  return (
    <div className={classes.container}>
      <Dropdown
        className={classes.dropdown}
        options={catagories}
        onChange={onChange}
        value={option}
      />
      <IconButton color="primary" onClick={() => setOpen(true)}>
        <Add />
      </IconButton>
      <Modal
        children={
          <AddCatagory
            submit={async (catagory: string) => {
              if (
                catagory.length > 0 &&
                !catagories.map(elm => elm.label).includes(catagory)
              ) {
                const catNew = await addCatagory({
                  label: catagory,
                  value: catagory.toLowerCase()
                });
                setCatagory(catNew);
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
