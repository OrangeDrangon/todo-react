import React from "react";
import Divider from "@material-ui/core/Divider";
import format from "date-fns/esm/format";

import "./Task.scss";

function Task({ content, date }: { content: string; date: Date }) {
  return (
    <div>
      <div>
        {content} - {format(date, "MMMM do hh:mm a")}
      </div>
      <Divider />
    </div>
  );
}

export default Task;
