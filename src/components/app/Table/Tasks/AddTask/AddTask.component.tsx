import React, { useState } from "react";
import { Card, Input, Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";

// import classes from "./AddTask.module.scss";

function AddTask({
  submit,
  setOpen
}: {
  submit: (content: string, date: Date) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());

  return (
      <Card>
        <Input
          onChange={({ currentTarget }) => setContent(currentTarget.value)}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker onChange={setDate} value={date} />
          <TimePicker onChange={setDate} value={date} />
        </MuiPickersUtilsProvider>
        <Button
          color="primary"
          variant="contained"
          onClick={() => submit(content, date)}
        >
          Add Task
        </Button>
      </Card>
  );
}

export default AddTask;
