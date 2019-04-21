import React from "react";
import format from "date-fns/esm/format";
import { Fade, Slide, IconButton } from "@material-ui/core";
import { Check, MoreVert, AccessTime } from "@material-ui/icons";

import classes from "./Task.module.scss";
import { Task as TaskClass } from "src/utils/database.util";

function Task({
  task,
  deleteTask
}: {
  task: TaskClass;
  deleteTask: () => void;
}) {
  return (
    <Fade in={true}>
      <Slide direction="up" in={true}>
        <div className={classes.wrapper}>
          <div>
            <IconButton onClick={deleteTask}>
              <Check />
            </IconButton>
          </div>
          <div className={classes.task}>
            <div>{task.content}</div>
            <div className={classes.time}>
              <AccessTime />
              <span className={classes.string}>
              {format(task.date, "MMMM do h:mm a")}
              </span>
            </div>
          </div>
          <div className={classes.fill} />
          <div>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
      </Slide>
    </Fade>
  );
}

export default Task;
