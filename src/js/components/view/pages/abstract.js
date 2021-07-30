import { Abstract } from '../abstract';

class AbstractPages extends Abstract {
  constructor(data) {
    super();
    this._data = data;
  }

  removeElement() {
    super.removeElement();
    this._data = null;
  }
}

export { AbstractPages };
