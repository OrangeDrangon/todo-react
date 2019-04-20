import React, { useState } from "react";
import { Card, Button, Input } from "@material-ui/core";

import "./AddCatagory.scss";

function AddCatagory({
  submit,
  setOpen
}: {
  submit: (catagory: string) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [value, setValue] = useState("");
  return (
    <div
      className="AddCatagory-Container"
      onClick={function(event) {
        if (event.target == event.currentTarget) {
          setOpen(false);
        }
      }}
    >
      <Card className="AddCatagory-Card" onClick={() => {}}>
        <Input
          onChange={({ currentTarget }) => setValue(currentTarget.value)}
        />
        <Button color="primary" variant="contained" onClick={() => submit(value)}>Submit</Button>
      </Card>
    </div>
  );
}

export default AddCatagory;
