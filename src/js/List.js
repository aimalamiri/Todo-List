import { store, getFromStorage } from './utilities.js';

export default class List {
  constructor() {
    this.tasks = [];
    this.tasks = getFromStorage('tasks');
  }

  add(task) {
    this.tasks.push(task);
    store(this.tasks, 'tasks');
  }

  delete(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.#sort();
    store(this.tasks, 'tasks');
  }

  update(task) {
    for (let i = 0; i < this.tasks.length; i += 1) {
      if (this.tasks[i].id === task.id) {
        this.tasks[i].index = task.index;
        this.tasks[i].title = task.title;
        this.tasks[i].complete = task.complete;
        store(this.tasks, 'tasks');
      }
    }
  }

  #sort() {
    let sorted = [];
    let count = 0;

    for (let i = 0; i < this.tasks.length; i += 1) {
      this.tasks[i].index = i;
    }

    while (count < this.tasks.length) {
      sorted.push(this.tasks.filter((t) => t.index === count)[0]);
      count++;
    }

    this.tasks = sorted;
  }
}
