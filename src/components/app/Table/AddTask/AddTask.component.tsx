import React, { useState } from "react";
import { Input, Button, Fade, Slide, Modal } from "@material-ui/core";
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
  const [date, setDate] = useState(new Date());

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
        disableAutoFocus={true}
        className={classes.modal}
        // Scroll bars fml
        style={{ zIndex: 100000000000 }}
        children={
          <div className={`${classes.card} card`}>
            <form className={classes.form}>
              <Input
                onChange={({ currentTarget }) =>
                  setContent(currentTarget.value)
                }
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker onChange={setDate} value={date} />
                <TimePicker onChange={setDate} value={date} />
              </MuiPickersUtilsProvider>
            </form>
            <Button
              color="primary"
              variant="contained"
              onClick={() => submit(content, date)}
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
