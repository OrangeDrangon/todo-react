import React, { useState } from "react";
import {Card, Button, Input} from "@material-ui/core";

import "./AddCatagory.scss";

function AddCatagory({ submit }: { submit: (catagory: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <Card>
      <Input onChange={({ currentTarget }) => setValue(currentTarget.value)} />
      <Button onClick={() => submit(value)}>Submit</Button>
    </Card>
  );
}

export default AddCatagory;
