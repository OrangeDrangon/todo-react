import React, { useState } from "react";
import { Option } from "react-dropdown";

import classes from "./Table.module.scss";
import CatagorySelect from "./CatagorySelect/CatagorySelect.component";
import Tasks from "./Tasks/Tasks.component";
import AddTask from "./AddTask/AddTask.component";
import DeleteCatagory from "./DeleteCatagory/DeleteCatagory.component";

import { useTasks } from "src/hooks/useTasks.hook";
import { useCatagories } from "src/hooks/useCatagories.hook";
import { Catagory, db } from "src/utils/database.util";

function Table() {
  const { catagories, addCatagory, deleteCatagory } = useCatagories();
  const [catagory, setCatagory] = useState<Catagory | null>(null);
  const { tasks, addTask, deleteTask } = useTasks(catagory);
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
            <Tasks tasks={tasks} deleteTask={deleteTask} />
          </div>
          <div className={classes.actions}>
            <AddTask
              submit={async (content: string, date: Date) => {
                await addTask({ catagoryId, content, date });
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
        <h3>Please select a catagory to get started</h3>
      )}
    </div>
  );
}

export default Table;
