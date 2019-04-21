import React from "react";
import format from "date-fns/esm/format";
import { Fade, Slide, IconButton } from "@material-ui/core";
import { Check } from "@material-ui/icons";

import classes from "./Task.module.scss";
import { Task as TaskClass } from "src/utils/database.util";

function Task({ task, deleteTask }: { task: TaskClass; deleteTask: () => void; }) {
  return (
    <Fade in={true}>
      <Slide direction="up" in={true}>
        <div className={classes.wrapper}>
            <div
              className={classes.content}
              style={{ color: task.date < new Date() ? "red" : "inherit" }}
            >
              <IconButton onClick={deleteTask}>
                <Check />
              </IconButton>
              {task.content} - {format(task.date, "MMMM do h:mm a")}
            </div>
        </div>
      </Slide>
    </Fade>
  );
}

export default Task;
