import './scss/index.scss';
import Task from './js/Task.js';
import List from './js/List.js';
import { insertTasksIntoDom, getTaskFromDom, taskBlur, taskFocus } from './js/utilities.js';

const listElement = document.querySelector('#list');
const addTaskForm = document.querySelector('#add-task');

const list = new List();
let tasks = list.tasks;

addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskInput = document.querySelector('#task-input');
  const task = new Task(taskInput.value, tasks.length, false);
  list.add(task);
  listElement.innerHTML = '';
  insertTasksIntoDom(tasks);
  addTaskForm.reset();
});

window.onload = () => {
  insertTasksIntoDom(tasks);
};

/**
 * 1. When the user clicks on the remove icon, remove the task and update the DOM
 * 2. When the user click in outside remove restore the icon and the task color
 * 3. User clicks on task change the background and the icon and remove the disable property from it's task input
 */

let focused;
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('control-indicator')) {
    const checkbox = event.target.parentElement.children[1];
    if (checkbox.checked) {
      checkbox.checked = false;
    } else {
      checkbox.checked = true;
    }
  }

  if (focused && !focused.contains(event.target)) {
    taskBlur(focused.getAttribute('id'));
    focused = '';
  }

  let taskButton = event.target.parentElement;
  let taskId = taskButton.getAttribute('data-btn-id');
  let taskButtonStatus = taskButton.getAttribute('data-status');

  if (taskButtonStatus === 'delete' && event.target === taskButton.firstChild) {
    list.delete(taskId);
    tasks = list.tasks;
    listElement.innerHTML = '';
    insertTasksIntoDom(tasks);
    focused = '';
    return;
  }

  if (taskId) {
    const focusOnTask = taskFocus(taskId);
    if (focusOnTask) {
      focused = focusOnTask;
    }
  }
});
