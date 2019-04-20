import React from "react";

import classes from "./Tasks.module.scss";
import AddTask from "./AddTask/AddTask.component";
import { useTasks } from "src/hooks/useTasks.hook";
import Task from "./Task/Task.component";

function Tasks({ name }: { name: string }) {
  const { tasks, addTask } = useTasks(name);

  const elementTasks = (tasks ? tasks : []).map<any>((elm: any) => {
    return <Task key={Math.random()} content={elm.content} date={elm.date} />;
  });

  return (
    <div className={classes.container}>
      {name ? (
        <div>
          <AddTask />
          {elementTasks}
        </div>
      ) : (
        "Select a class to get started"
      )}
      <button
        onClick={() => {
          addTask(Math.random().toString(), new Date());
        }}
      >
        Add
      </button>
    </div>
  );
}

export default Tasks;
