import { useState, useEffect } from "react";

import { Task, ITask, Catagory } from "src/utils/database.util";

export function useTasks(catagory: Catagory | null) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = async (task: ITask) => {
    if (catagory) {
      const tNew = await new Task(task).save();
      const tasksNew = [tNew, ...tasks];
      setTasks(tasksNew);
    }
  };

  useEffect(() => {
    (async () => {
      if (catagory) {
        await catagory.loadTasks()
        setTasks(catagory.tasks.slice());

        return () => {
          setTasks([]);
        };
      }

    })();
  }, [catagory]);

  return { tasks, addTask };
}
