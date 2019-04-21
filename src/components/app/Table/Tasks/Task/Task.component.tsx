import React from "react";
import format from "date-fns/esm/format";
import { Fade, Slide } from "@material-ui/core";
import { Task as TaskClass } from "src/utils/database.util";

import classes from "./Task.module.scss";

function Task({ task }: { task: TaskClass }) {
  return (
    <Fade in={true}>
      <Slide direction="up" in={true}>
        <div className={classes.content}>
          {task.content} - {format(task.date, "MMMM do h:mm a")}
        </div>
      </Slide>
    </Fade>
  );
}

export default Task;
