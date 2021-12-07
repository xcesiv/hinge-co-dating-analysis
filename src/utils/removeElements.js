function removeElements(elements) {
  elements.forEach((el) => el.parentElement.removeChild(el));
}
