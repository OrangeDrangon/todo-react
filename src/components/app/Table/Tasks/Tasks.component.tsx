import React from "react";

import classes from "./Tasks.module.scss";
import AddTask from "./AddTask/AddTask.component";
import { useTasks } from "src/hooks/useTasks.hook";
import Task from "./Task/Task.component";
import { Catagory } from "src/utils/database.util";

function Tasks({ catagory }: { catagory: Catagory | null }) {
  const { tasks, addTask } = useTasks(catagory);

  const elementTasks = (tasks ? tasks : []).map<any>((elm: any) => {
    return <Task key={Math.random()} content={elm.content} date={elm.date} />;
  });

  const id = catagory && catagory.id ? catagory.id : "";

  return (
    <div className={classes.container}>
      {catagory ? (
        <div>
          <AddTask />
          {elementTasks}
        </div>
      ) : (
        "Select a class to get started"
      )}
      {
        id ? <button
        onClick={() => {
          addTask({catagoryId: id, content: Math.random().toString(), date: new Date()});
        }}
      >
        Add
      </button> : ""
      }
    </div>
  );
}

export default Tasks;
