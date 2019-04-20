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

export class Catagory implements ICatagory {
  id: number | undefined;
  label: string;
  value: string;
  @enumerable(false) tasks: ITask[];

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
  save() {
    return db.transaction("rw", [db.catagories], async () => {
      this.id = await db.catagories.put(this);

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
    });
  }

  async loadTasks() {
    if (this.id) {
      this.tasks = await db.tasks
        .where("catagoryId")
        .equals(this.id)
        .toArray();
    } else {
      throw new Error("Please save the catagory to access its foreign objects");
    }
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
