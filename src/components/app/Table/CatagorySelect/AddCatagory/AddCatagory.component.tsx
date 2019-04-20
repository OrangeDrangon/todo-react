import React, { useState } from "react";
import { Card, Button, Input } from "@material-ui/core";

import classes from "./AddCatagory.module.scss";

function AddCatagory({
  submit,
}: {
  submit: (catagory: string) => void;
}) {
  const [value, setValue] = useState("");
  return (
    <Card className={classes.card}>
      <Input onChange={({ currentTarget }) => setValue(currentTarget.value)} />
      <Button color="primary" variant="contained" onClick={() => submit(value)}>
        Submit
      </Button>
    </Card>
  );
}

export default AddCatagory;
