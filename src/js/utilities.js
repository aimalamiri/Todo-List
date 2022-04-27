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

export { appendChild, store, getFromStorage };
