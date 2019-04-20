import React, { useState } from "react";

import classes from "./Tasks.module.scss";
import AddTask from "./AddTask/AddTask.component";
import { useTasks } from "src/hooks/useTasks.hook";
import Task from "./Task/Task.component";
import { Catagory } from "src/utils/database.util";
import { Button, Modal } from "@material-ui/core";

function Tasks({ catagory }: { catagory: Catagory | null }) {
  const [open, setOpen] = useState(false);
  const { tasks, addTask } = useTasks(catagory);

  const elementTasks = (tasks ? tasks : []).map<any>(elm => {
    return (
      <Task
        key={elm.id ? elm.id : Math.random()}
        content={elm.content}
        date={elm.date}
      />
    );
  });

  const catagoryId = catagory && catagory.id ? catagory.id : "";

  return catagoryId ? (
    <div className={classes.container}>
      <Button color="primary" variant="contained" onClick={() => setOpen(true)}>
        Add a Task
      </Button>
      <Modal
        open={open}
        onBackdropClick={() => setOpen(false)}
        onEscapeKeyDown={() => setOpen(true)}
        disableAutoFocus={true}
        className={classes.modal}
        children={
          <AddTask
            setOpen={setOpen}
            submit={async (content: string, date: Date) => {
              if (content.length > 0) {
                await addTask({ catagoryId, content, date });
                setOpen(false);
              }
            }}
          />
        }
      />
      {elementTasks}
    </div>
  ) : (
    <div>Select a class to get started</div>
  );
}

export default Tasks;
