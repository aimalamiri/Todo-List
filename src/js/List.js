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
}
