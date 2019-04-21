import React from "react";

import classes from "./Tasks.module.scss";
import Task from "./Task/Task.component";
import { Task as TaskClass } from "src/utils/database.util";

function Tasks({
  tasks,
  deleteTask,
  updateTask
}: {
  tasks: TaskClass[];
  deleteTask: (index: number) => void;
  updateTask: (index: number, data: {content: string, date: Date}) => void;
}) {
  const elementTasks = (tasks ? tasks : []).map<any>((task, index) => {
    return (
      <Task
        key={task.id ? task.id : Math.random()}
        task={task}
        index={index}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    );
  });

  return <div className={classes.container}>{elementTasks}</div>;
}

export default Tasks;
