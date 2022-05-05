/* eslint-disable */

import List from '../js/List.js';
import Task from '../js/Task.js';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  localStorage.setItem.mockClear();
});

test('Should add to localStorage', () => {
  const task = new Task('Task', 1);
  const list = new List();
  list.add(task);
  expect(list.tasks.length).toBe(1);
  expect(localStorage.__STORE__['tasks']).toBe(JSON.stringify(list.tasks));
});

test('Should delete in localStorage', () => {
  const task = new Task('Task', 1);
  const list = new List();
  list.add(task);
  list.delete(task.id);
  expect(list.tasks.length).toBe(0);
  expect(localStorage.__STORE__['tasks']).toBe(JSON.stringify(list.tasks));
});
