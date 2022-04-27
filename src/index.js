import './scss/index.scss';
import appendChild from './js/utilities.js';

const tasks = [];

window.onload = () => {
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
      '#list',
    );
  }
};
