import './scss/index.scss';
import appendChild from './js/utilities';

const tasks = [
  {
    description: 'Build todo list',
    completed: true,
    index: 0,
  },
  {
    description: 'Ask for the code review',
    completed: true,
    index: 1,
  },
  {
    description: 'Implement changes',
    completed: false,
    index: 2,
  },
];

window.onload = () => {
  appendChild(
    `
    <li class="p-1 text-gray border-b-1 flex justify-between items-center">
      <h3>Today's Todo</h3>
      <a href="#" class="flex items-center"><span class="icon icon-reload" /></a>
    </li> 
    <li class="p-1 text-gray border-b-1 flex justify-between items-center">
      <input type="text" class="task-input" placeholder="Add to your list...">
      <a href="#" class="flex items-center"><span class="icon icon-enter" /></a>
    </li> 
  `,
    '#list'
  );
  for (let i = 0; i < tasks.length; i += 1) {
    appendChild(
      `
    <li class="p-1 text-gray border-b-1 flex justify-between items-center">
      <div>
        <label class="control control-checkbox" for="task-${i}">
          ${tasks[i].description}
          <input type="checkbox" id="task-${i}" ${tasks[i].completed ? 'checked' : ''} />
          <div class="control_indicator"></div>
        </label>
      </div>
      <a href="#" class="flex items-center"><span class="icon icon-dots" /></a>
    </li>`,
      '#list'
    );
  }
  appendChild(
    `
    <li class="p-1 text-gray flex justify-center">
      <a href="#">Clear all completed</a>
    </li> 
  `,
    '#list'
  );
};
