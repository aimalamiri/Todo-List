const appendChild = (html, place) => {
  const element = document.createRange().createContextualFragment(html);
  document.querySelector(place).appendChild(element);
};

const store = (data, name) => {
  localStorage.setItem(name, JSON.stringify(data));
};

const getFromStorage = (name) => {
  const storage = JSON.parse(localStorage.getItem(name));
  let elements = [];
  if (storage) {
    for (let i = 0; i < storage.length; i += 1) {
      elements.push(storage[i]);
    }
  }
  return elements;
};

const insertTasksIntoDom = (tasks) => {
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

const getTaskFromDom = (id) => {
  const task = document.querySelector(`#${id}`);
  const checkbox = document.querySelector(`[data-check-id="${id}"]`);
  const text = document.querySelector(`[data-input-id="${id}"]`);
  const btn = document.querySelector(`[data-btn-id="${id}"]`);
  const icon = btn.firstChild;
  return { task, checkbox, text, btn, icon };
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

export { appendChild, store, getFromStorage, insertTasksIntoDom, getTaskFromDom, taskBlur, taskFocus };
