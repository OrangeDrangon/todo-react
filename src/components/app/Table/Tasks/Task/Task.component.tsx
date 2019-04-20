import React from "react";
import Divider from "@material-ui/core/Divider";
import format from "date-fns/esm/format";
import { Fade, Slide } from "@material-ui/core";

// import classes from "./Task.module.scss";

function Task({ content, date }: { content: string; date: Date }) {
  return (
    <Fade in={true}>
      <Slide direction="up" in={true}>
        <div>
          {content} - {format(date, "MMMM do h:mm a")}
          <Divider />
        </div>
      </Slide>
    </Fade>
  );
}

export default Task;
