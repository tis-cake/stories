const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Невозможно создать экземляр класса Abstract, так как он является родительским классом');
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('Метод класса Abstract не реализует getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export { Abstract };
