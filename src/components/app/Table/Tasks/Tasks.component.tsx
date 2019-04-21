import React from "react";

import classes from "./Tasks.module.scss";
import Task from "./Task/Task.component";
import { Task as TaskClass } from "src/utils/database.util";

function Tasks({
  tasks,
  deleteTask
}: {
  tasks: TaskClass[];
  deleteTask: (index: number) => void;
}) {
  const elementTasks = (tasks ? tasks : []).map<any>((task, index) => {
    return <Task key={task.id ? task.id : Math.random()} task={task} deleteTask={() => deleteTask(index)} />;
  });

  return <div className={classes.container}>{elementTasks}</div>;
}

export default Tasks;
