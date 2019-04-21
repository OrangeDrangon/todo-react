import React, { useState } from "react";
import { Button, Fade, Slide } from "@material-ui/core";
import TaskDetails from "../TaskDetails/TaskDetails.component";

function AddTask({
  submit
}: {
  submit: (content: string, date: Date) => Promise<boolean>;
}) {
  const [open, setOpen] = useState(false);

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
      <TaskDetails
        open={open}
        setOpen={setOpen}
        initialDate={new Date(Date.now() + 15 * 60 * 1000)}
        initialContent=""
        submit={submit}
      />
    </div>
  );
}

export default AddTask;
