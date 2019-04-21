import React, { useState } from "react";
import { Modal, Button, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker
} from "material-ui-pickers";

import classes from "./TaskDetails.module.scss";

function TaskDetails({
  open,
  setOpen,
  initialDate,
  initialContent,
  submit
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialDate: Date;
  initialContent: string;
  submit: (content: string, date: Date) => void;
}) {
  const [content, setContent] = useState(initialContent);
  const [date, setDate] = useState(initialDate);

  return (
    <Modal
      open={open}
      onBackdropClick={() => setOpen(false)}
      onEscapeKeyDown={() => setOpen(true)}
      className={classes.modal}
      children={
        <div className={`${classes.card} card`}>
          <form className={classes.form}>
            <div className={classes.field}>
              <TextField
                label="Task"
                value={content}
                onChange={({ currentTarget }) =>
                  setContent(currentTarget.value)
                }
              />
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className={classes.field}>
                <DatePicker onChange={setDate} value={date} label="Date" />
              </div>
              <div className={classes.field}>
                <TimePicker onChange={setDate} value={date} label="Time" />
              </div>
            </MuiPickersUtilsProvider>
          </form>
          <Button
            color="primary"
            variant="contained"
            onClick={async () => {
              await submit(content, date);
            }}
          >
            Add Task
          </Button>
        </div>
      }
    />
  );
}

export default TaskDetails;
