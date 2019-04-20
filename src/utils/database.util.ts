import Dexie from "dexie";

export interface ICatagory {
  id?: number;
  label: string;
  value: string;
}

export interface ITask {
  id?: number;
  catagoryId: number;
  content: string;
  date: Date;
}

export class Task implements ITask {
  id: number | undefined;
  catagoryId: number;
  content: string;
  date: Date;

  constructor({ id, catagoryId, content, date }: ITask) {
    this.id = id;
    this.catagoryId = catagoryId;
    this.content = content;
    this.date = date;
  }

  async save() {
    const tNew = await db.addTask(this);
    if (tNew.id) {
      this.id = tNew.id;
    }
    return tNew;
  }
}

export class Catagory implements ICatagory {
  id: number | undefined;
  label: string;
  value: string;
  @enumerable(false) tasks: Task[];

  constructor({ id, label, value }: ICatagory) {
    this.id = id;
    this.label = label;
    this.value = value;
    this.tasks = [];
  }

  /**
   * Saves the modified record to the database including deleting any removed tasks
   * Uses a transaction for roll back purposes on error
   */
  async save() {
    return await db.transaction("rw", [db.catagories, db.tasks], async () => {
      const catNew = await db.addCatagory(this);

      if (catNew.id) {
        this.id = catNew.id;

        const taskIds = await Promise.all(
          this.tasks.map(task => db.tasks.put(task))
        );

        await db.tasks
          .where("catagoryId")
          .equals(this.id)
          .and(task => {
            if (task.id) {
              return taskIds.indexOf(task.id) === -1;
            } else {
              return false;
            }
          })
          .delete();
      }
      return catNew;
    });
  }

  async loadTasks() {
    if (this.id) {
      this.tasks = (await db.tasks
        .where("catagoryId")
        .equals(this.id)
        .toArray()).map(elm => new Task(elm));
    } else {
      throw new Error("Please save the catagory to access its foreign objects");
    }
  }

  static async getAll() {
    return (await db.catagories.toArray()).map(elm => new Catagory(elm));
  }
}

export class Database extends Dexie {
  catagories: Dexie.Table<ICatagory, number>;
  tasks: Dexie.Table<ITask, number>;

  constructor(name: string) {
    super(name);
    this.version(1).stores({
      catagories: "++id, label, value",
      tasks: "++id, catagoryId, content, date"
    });

    this.catagories = this.table("catagories");
    this.tasks = this.table("tasks");

    this.catagories.mapToClass(Catagory);
  }

  async addCatagory({ id, ...data }: ICatagory) {
    return await this.transaction("rw", [this.catagories], async () => {
      const newId = id
        ? await this.catagories.put({ id, ...data })
        : await this.catagories.put(data);
      return new Catagory({ id: newId, ...data });
    });
  }

  async addTask({ id, ...data }: ITask) {
    return await this.transaction("rw", [this.tasks], async () => {
      const newId = id
        ? await this.tasks.put({ id, ...data })
        : await this.tasks.put(data);

      return new Task({ id: newId, ...data });
    });
  }

  async getCatagory(value: string) {
    return new Catagory(
      (await this.catagories
        .where("value")
        .equals(value)
        .limit(1)
        .toArray())[0]
    );
  }
}

export var db = new Database("todo");

/**
 * @enumerable decorator that sets the enumerable property of a class field to false.
 * @param value true|false
 */
function enumerable(value: boolean) {
  return function(target: any, propertyKey: string) {
    let descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
    // eslint-disable-next-line eqeqeq
    if (descriptor.enumerable != value) {
      descriptor.enumerable = value;
      Object.defineProperty(target, propertyKey, descriptor);
    }
  };
}
