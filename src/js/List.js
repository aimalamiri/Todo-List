import {store, getFromStorage} from './utilities.js';

export default class List {
  constructor() {
    this.tasks = [];
    this.tasks = getFromStorage('tasks');
  }

  add(task) {
    this.tasks.unshift(task);
    store(this.tasks, 'tasks'); 
  }

  delete(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    store(this.tasks, 'tasks');
  }

  update(task) {
    for (let i = 0; i < this.tasks.length; i += 1) {
      if (this.tasks[i].id === task.id) {
        this.tasks[i].index = task.index;
        this.tasks[i].title = task.title;
        this.tasks[i].complete = task.complete;
        console.log(this.tasks)
        store(this.tasks, 'tasks');
        // break;
      }
    }
  }
}
