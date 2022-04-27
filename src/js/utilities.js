const appendChild = (html, place) => {
  const element = document.createRange().createContextualFragment(html);
  document.querySelector(place).appendChild(element);
};

export default appendChild;
