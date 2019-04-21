import { useState, useEffect } from "react";

import { Task, Catagory, ITask } from "../utils/database.util";

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
      catagory.tasks
        .reverse()
        .splice(index, 1)
        .reverse();
      await catagory.save();
      setTasks(catagory.tasks.slice());
    }
  };

  const updateTask = async (
    index: number,
    { content, date }: { content: string; date: Date }
  ) => {
    if (catagory) {
      await catagory.loadTasks();
      const tasksNew = catagory.tasks.slice().reverse();
      const task = tasksNew[index];
      task.content = content;
      task.date = date;
      catagory.tasks = tasksNew.slice().reverse();
      await catagory.save();
      setTasks(tasksNew);
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

  return { tasks, addTask, deleteTask, updateTask };
}
