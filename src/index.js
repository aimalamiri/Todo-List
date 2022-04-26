import './scss/index.scss';
import appendChild from './js/utilities';

const tasks = [
  {
    description: 'Build todo list',
    completed: false,
    index: 0,
  },
  {
    description: 'Ask for the code review',
    completed: false,
    index: 1,
  },
  {
    description: 'Implement changes',
    completed: false,
    index: 2,
  },
];

window.onload = () => {
  for (let i = 0; i < tasks.length; i += 1) {
    appendChild(`<li>${tasks[i].description}</li>`, '#list');
  }
};
