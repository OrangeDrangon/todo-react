import React from "react";

import classes from "./Tasks.module.scss";
import Task from "./Task/Task.component";
import { Catagory, Task as TaskClass } from "src/utils/database.util";

function Tasks({
  catagory,
  tasks
}: {
  catagory: Catagory;
  tasks: TaskClass[];
}) {
  const elementTasks = (tasks ? tasks : []).map<any>(task => {
    return <Task key={task.id ? task.id : Math.random()} task={task} />;
  });

  const catagoryId = catagory && catagory.id ? catagory.id : "";

  return <div className={classes.container}>{elementTasks}</div>;
}

export default Tasks;
