import React from "react";

import classes from "./Tasks.module.scss";
import Task from "./Task/Task.component";
import { Task as TaskClass } from "src/utils/database.util";

function Tasks({
  tasks
}: {
  tasks: TaskClass[];
}) {
  const elementTasks = (tasks ? tasks : []).map<any>(task => {
    return <Task key={task.id ? task.id : Math.random()} task={task} />;
  });

  return <div className={classes.container}>{elementTasks}</div>;
}

export default Tasks;
