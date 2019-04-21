import React, { useState } from "react";
import { Button, IconButton, Modal, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import classes from "./AddCatagory.module.scss";

function AddCatagory({
  submit
}: {
  submit: (value: string) => Promise<boolean>;
}) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton color="primary" onClick={() => setOpen(true)}>
        <Add />
      </IconButton>
      <Modal
        className={classes.modal}
        open={open}
        onBackdropClick={() => setOpen(false)}
        onEscapeKeyDown={() => setOpen(false)}
        children={
          <div className={`${classes.card} card`}>
            <TextField
              className={classes.input}
              label="Name"
              onChange={({ currentTarget }) => setValue(currentTarget.value)}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={async () => {
                if (await submit(value)) {
                  setOpen(false);
                }
              }}
            >
              Submit
            </Button>
          </div>
        }
      />
    </div>
  );
}

export default AddCatagory;
