import './scss/index.scss';
import Task from './js/Task.js';
import List from './js/List.js';
import { appendChild } from './js/utilities.js';

const listElement = document.querySelector('#list');
const addTaskForm = document.querySelector('#add-task');
const list = new List();

const tasks = list.tasks;

addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskInput = document.querySelector('#task-input');
  const task = new Task(taskInput.value, tasks.length, false);
  list.add(task);
  listElement.innerHTML = '';
  insertTasksIntoDom();
  addTaskForm.reset(); 
});

window.onload = () => {
  insertTasksIntoDom();
};

const insertTasksIntoDom = () => {
  for (let i = 0; i < tasks.length; i += 1) {
    appendChild(
      `
    <li class="p-1 text-gray border-b-1 flex justify-between items-center">
      <div>
        <label class="control control-checkbox" for="task-${i}">
          ${tasks[i].description}
          <input type="checkbox" id="task-${i}" ${tasks[i].completed ? 'checked' : ''} />
          <div class="control-indicator"></div>
        </label>
      </div>
      <a href="#" class="flex items-center"><span class="icon icon-dots" /></a>
    </li>`,
      '#list'
    );
  }
};
