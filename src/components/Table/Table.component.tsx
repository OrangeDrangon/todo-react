import React, { useState } from "react";
import { Option } from "react-dropdown";

import classes from "./Table.module.scss";
import CatagorySelect from "./CatagorySelect/CatagorySelect.component";
import Tasks from "./Tasks/Tasks.component";
import AddTask from "./AddTask/AddTask.component";
import DeleteCatagory from "./DeleteCatagory/DeleteCatagory.component";

import { useTasks } from "hooks/useTasks.hook";
import { useCatagories } from "hooks/useCatagories.hook";
import { Catagory, db } from "utils/database.util";

function Table() {
  const { catagories, addCatagory, deleteCatagory } = useCatagories();
  const [catagory, setCatagory] = useState<Catagory | null>(null);
  const { tasks, addTask, deleteTask, updateTask } = useTasks(catagory);

  const handleChange = async (selected: Option) => {
    setCatagory(await db.getCatagory(selected.value));
  };

  const catagoryId = catagory && catagory.id ? catagory.id : null;

  return (
    <div className={`${classes.card} card`}>
      <h1 className={classes.header}>Todo</h1>
      <div className={classes.dropdown}>
        <CatagorySelect
          onChange={handleChange}
          catagory={catagory}
          setCatagory={setCatagory}
          catagories={catagories}
          addCatagory={addCatagory}
        />
      </div>
      {catagory && catagoryId ? (
        <div className={classes.content}>
          <div className={classes.tasks}>
            <Tasks
              tasks={tasks}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          </div>
          <div className={classes.actions}>
            <AddTask
              submit={async (content: string, date: Date) => {
                if (content.length > 0 && date > new Date()) {
                  await addTask({ catagoryId, content, date });
                  return true;
                } else {
                  return false;
                }
              }}
            />
            <div style={{ flex: "1 0 0" }} />
            <DeleteCatagory
              deleteCatagory={async () => {
                await deleteCatagory(catagory);
                setCatagory(null);
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Table;
