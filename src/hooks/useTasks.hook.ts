import { useState, useEffect } from "react";

export function useTasks(name: string | null) {
  const [tasks, setTasks] = useState<ITask[] | null>(null);

  const saveTasks = (tasks: ITask[]) => {
    if (name) {
      localStorage.setItem(name, JSON.stringify(tasks));
    }
  };

  const addTask = (content: string, date: Date) => {
    if (tasks && name) {
      const task: ITask = {
        content,
        date
      };
      const tasksNew = [task, ...tasks];
      setTasks(tasksNew);
      saveTasks(tasksNew);
    }
  };

  useEffect(() => {
    if (name) {
      const tasksNew: Array<{ content: string; date: string }> = JSON.parse(
        localStorage.getItem(name) || "[]"
      );
      const tasksNewParsed: ITask[] = tasksNew.map(elm => {
        return { content: elm.content, date: new Date(elm.date) };
      });
      setTasks(tasksNewParsed);

      return () => {
        setTasks(null);
      };
    }
  }, [name]);

  return { tasks, addTask };
}

export interface ITask {
  content: string;
  date: Date;
}
