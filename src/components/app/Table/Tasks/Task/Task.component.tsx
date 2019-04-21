import React, { useState } from "react";
import format from "date-fns/esm/format";
import { Fade, Slide, IconButton } from "@material-ui/core";
import { Check, MoreVert, AccessTime } from "@material-ui/icons";

import classes from "./Task.module.scss";
import { Task as TaskClass } from "src/utils/database.util";
import TaskDetails from "../../TaskDetails/TaskDetails.component";

function Task({
  task,
  index,
  deleteTask,
  updateTask
}: {
  task: TaskClass;
  index: number;
  deleteTask: (index: number) => void;
  updateTask: (index: number, data: {content: string, date: Date}) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.border}>
      <Fade in={true}>
        <Slide direction="up" in={true}>
          <div className={classes.wrapper}>
            <div className={classes.check}>
              <IconButton onClick={async () => await deleteTask(index)}>
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
            <div className={classes.more}>
              <IconButton onClick={() => setOpen(true)}>
                <MoreVert />
              </IconButton>
            </div>
          </div>
        </Slide>
      </Fade>
      <TaskDetails
        open={open}
        setOpen={setOpen}
        initialContent={task.content}
        initialDate={task.date}
        submit={async (content, date) => {
          if (content.length > 0 && date > new Date()) {
            await updateTask(index, { content, date });
            return true;
          } else {
            return false;
          }
        }}
      />
    </div>
  );
}

export default Task;
