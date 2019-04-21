import { useState, useEffect } from "react";

import { Task, Catagory, ITask } from "src/utils/database.util";

export function useTasks(catagory: Catagory | null) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = async (data: ITask) => {
    if (catagory) {
      const tNew = await new Task(data).save();
      const tasksNew = [tNew, ...tasks];
      setTasks(tasksNew);
    }
  };

  const deleteTask = async (index: number) => {
    if (catagory) {
      await catagory.loadTasks();
      catagory.tasks.reverse().splice(index, 1).reverse();
      await catagory.save();
      setTasks(catagory.tasks.slice());

    }
  };

  useEffect(() => {
    (async () => {
      if (catagory) {
        await catagory.loadTasks();
        setTasks(catagory.tasks.slice().reverse());

        return () => {
          setTasks([]);
        };
      }
    })();
  }, [catagory]);

  return { tasks, addTask, deleteTask };
}
