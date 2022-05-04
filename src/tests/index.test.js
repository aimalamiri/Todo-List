import { insertTasksIntoDom } from '../js/utilities';
import List from '../js/List.js';
import Task from '../js/Task.js';


test('Add one new item to the list', () => {
    const task = new Task('123',0);
    const list = new List();
    list.add(task);
    document.body.innerHTML =
    '<div>' +
    '  <ul id="list"></li>' +
    '</div>';
    insertTasksIntoDom(list.tasks);

    const list_elements = document.querySelectorAll('#list li');
    expect(list_elements).toHaveLength(1);
});
  