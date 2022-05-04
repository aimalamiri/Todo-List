import { insertTasksIntoDom } from '../js/utilities';
import List from '../js/List.js';
import Task from '../js/Task.js';

describe('Tests for the DOM of tasks', () => {
  let task;
  let list;
  beforeEach(() => {
    task = new Task('123', 0);
    list = new List();
  });

  test('Add one new item to the list', () => {
    list.add(task);
    document.body.innerHTML = '<div>' + '  <ul id="list"></li>' + '</div>';
    insertTasksIntoDom(list.tasks);

    const list_elements = document.querySelectorAll('#list li');
    expect(list_elements).toHaveLength(1);
  });

  test('Delete a task from the List', () => {
    const task2 = new Task('new Task', 1);
    list.add(task2);
    list.delete(task2.id);
    const tasks = list.tasks;
    document.querySelector('#list').innerHTML = '';
    insertTasksIntoDom(tasks);
    const list_elements = document.querySelectorAll('#list li');
    expect(list_elements).toHaveLength(1);
  });
});
// if (taskButtonStatus === 'delete' && event.target === taskButton.firstChild) {
//   list.delete(taskId);
//   updateList();
//   focused = '';
//   return;
// }

// test('Delete a task from the List', () => {
//   let task = new Task('');
// });
