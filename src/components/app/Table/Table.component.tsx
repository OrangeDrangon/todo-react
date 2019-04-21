import React, { useState } from "react";
import { Option } from "react-dropdown";

import classes from "./Table.module.scss";
import CatagorySelect from "./CatagorySelect/CatagorySelect.component";
import Tasks from "./Tasks/Tasks.component";
import { Catagory, db } from "src/utils/database.util";
import AddTask from "./AddTask/AddTask.component";
import { useTasks } from "src/hooks/useTasks.hook";

function Table() {
  const [catagory, setCatagory] = useState<Catagory | null>(null);
  const { tasks, addTask } = useTasks(catagory);
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
        />
      </div>
      {catagoryId ? (
        <div className={classes.content}>
          <div className={classes.tasks}>
            <Tasks tasks={tasks} />
          </div>
          <div className={classes.actions}>
            <AddTask
              submit={async (content: string, date: Date) => {
                await addTask({ catagoryId, content, date });
              }}
            />
          </div>
        </div>
      ) : (
        <div>Please select a catagory</div>
      )}
    </div>
  );
}

export default Table;
