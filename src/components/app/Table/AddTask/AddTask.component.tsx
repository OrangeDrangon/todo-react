import React, { useState } from "react";
import { Button, Fade, Slide, Modal, TextField } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";

import classes from "./AddTask.module.scss";

function AddTask({
  submit
}: {
  submit: (content: string, date: Date) => void;
}) {
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  // Sets the date 15 mins into the future
  const [date, setDate] = useState(new Date(Date.now() + 15 * 60 * 1000));

  return (
    <div>
      <Fade in={true}>
        <Slide direction="left" in={true}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Add a Task
          </Button>
        </Slide>
      </Fade>
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
                if (content.length > 0 && date > new Date()) {
                  await submit(content, date);
                  setOpen(false);
                }
              }}
            >
              Add Task
            </Button>
          </div>
        }
      />
    </div>
  );
}

export default AddTask;
