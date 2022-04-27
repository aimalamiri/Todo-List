import './scss/index.scss';
import Task from './js/Task.js';
import List from './js/List.js';
import { appendChild } from './js/utilities.js';

const listElement = document.querySelector('#list');
const addTaskForm = document.querySelector('#add-task');
const list = new List();

let tasks = list.tasks;

addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskInput = document.querySelector('#task-input');
  const task = new Task(taskInput.value, tasks.length);
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
    <li id="${tasks[i].id}" class="task p-1 text-gray border-b-1 flex justify-between items-center" tabindex="0">
      <div class="w-full">
        <label class="control control-checkbox" for="task-${i}">
          <div class="w-full">
            <input type="text" data-input-id="${tasks[i].id}" class="task-text" value="${
        tasks[i].description
      }" disabled />
          </div>
          <input type="checkbox" data-check-id="${tasks[i].id}" ${tasks[i].completed ? 'checked' : ''} />
          <div class="control-indicator"></div>
        </label>
      </div>
      <a href="#" data-btn-id="${
        tasks[i].id
      }" class="flex items-center" data-status="edit"><span class="icon icon-dots" /></a>
    </li>`,
      '#list'
    );
  }
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
    insertTasksIntoDom();
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

let taskFocus = (id) => {
  if (id) {
    const { task, text, btn, icon } = getTaskFromDom(id);
    icon.classList.remove('icon-dots');
    icon.classList.add('icon-delete');
    task.classList.add('bg-light-yellow');
    text.removeAttribute('disabled');
    btn.setAttribute('data-status', 'delete');
    task.focus();
    return task;
  }
};

let taskBlur = (id) => {
  if (id) {
    const { task, text, btn, icon } = getTaskFromDom(id);
    icon.classList.add('icon-dots');
    icon.classList.remove('icon-delete');
    task.classList.remove('bg-light-yellow');
    task.classList.add('bg-white');
    text.setAttribute('disabled', true);
    btn.setAttribute('data-status', 'edit');
    task.blur();
  }
};

const getTaskFromDom = (id) => {
  const task = document.querySelector(`#${id}`);
  const checkbox = document.querySelector(`[data-check-id="${id}"]`);
  const text = document.querySelector(`[data-input-id="${id}"]`);
  const btn = document.querySelector(`[data-btn-id="${id}"]`);
  const icon = btn.firstChild;
  return { task, checkbox, text, btn, icon };
};
