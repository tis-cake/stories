import { Abstract } from '../abstract';

import { NavControlType, SearchParam } from '../../../consts';

const FIRST_PAGE_CLASS = 'nav-controls--first-page';
const LAST_PAGE_CLASS = 'nav-controls--last-page';

const createNavControlsTemplate = () => {
  return (
    `
      <div class="board__nav-controls nav-controls">
        <button
          class="nav-controls__btn nav-controls__btn--theme nav-controls__btn--light"
          aria-label="Переключить на темную цветовую тему"
          data-control-type="${NavControlType.THEME_DARK}"
          data-param-type="${SearchParam.THEME}"
        >
          <p class="nav-controls__btn__desc visually-hidden">
            Переключить на темную цветовую тему.
          </p>

          <svg class="nav-controls__icon" width="32" height="32">
            <use xlink:href="assets/images/sprite.svg#theme-dark"></use>
          </svg>
        </button>

        <button
          class="nav-controls__btn nav-controls__btn--theme nav-controls__btn--dark"
          aria-label="Переключить на светлую цветовую тему"
          data-control-type="${NavControlType.THEME_LIGHT}"
          data-param-type="${SearchParam.THEME}"
        >
          <p class="nav-controls__btn__desc visually-hidden">
            Переключить на светлую цветовую тему.
          </p>

          <svg class="nav-controls__icon" width="32" height="32">
            <use xlink:href="assets/images/sprite.svg#theme-light"></use>
          </svg>
        </button>

        <button
          class="nav-controls__btn nav-controls__btn--next"
          aria-label="Следующая страница"
          data-control-type="${NavControlType.PAGE_NEXT}"
          data-param-type="${SearchParam.PAGE}"
        >
          <p class="nav-controls__btn__desc visually-hidden">
            Следующая страница.
          </p>

          <svg class="nav-controls__icon" width="32" height="32">
            <use xlink:href="assets/images/sprite.svg#nav"></use>
          </svg>
        </button>

        <button
          class="nav-controls__btn nav-controls__btn--prev"
          aria-label="Предыдущая страница"
          data-control-type="${NavControlType.PAGE_PREV}"
          data-param-type="${SearchParam.PAGE}"
        >
          <p class="nav-controls__btn__desc visually-hidden">
            Предыдущая страница.
          </p>

          <svg class="nav-controls__icon" width="32" height="32">
            <use xlink:href="assets/images/sprite.svg#nav"></use>
          </svg>
        </button>

        <button
          class="nav-controls__btn nav-controls__btn--restart"
          aria-label="К начальной старнице"
          data-control-type="${NavControlType.PAGE_DEFAULT}"
          data-param-type="${SearchParam.PAGE}"
        >
          <p class="nav-controls__btn__desc visually-hidden">
            К начальной старнице.
          </p>

          <svg class="nav-controls__icon" width="32" height="32">
            <use xlink:href="assets/images/sprite.svg#restart"></use>
          </svg>
        </button>
      </div>
    `
  );
};

class NavControls extends Abstract {
  constructor() {
    super();

    this._container = this.getElement();

    this._navControlClickCallback = this._navControlClickCallback.bind(this);
  }

  getTemplate() {
    return createNavControlsTemplate();
  }

  addExtraClass(extraOptions) {
    const { isFirst, isLast, isMiddle } = extraOptions;

    if (isFirst) {
      this._container.classList.add(FIRST_PAGE_CLASS);
      this._container.classList.remove(LAST_PAGE_CLASS);
    }

    if (isLast) {
      this._container.classList.add(LAST_PAGE_CLASS);
      this._container.classList.remove(FIRST_PAGE_CLASS);
    }

    if (isMiddle) {
      this._container.classList.remove(LAST_PAGE_CLASS);
      this._container.classList.remove(FIRST_PAGE_CLASS);
    }
  }

  addNavControlClickListener(callback) {
    this._callback.navControlClick = callback;
    this._container.addEventListener('click', this._navControlClickCallback);
  }

  _navControlClickCallback(evt) {
    if (evt.target === evt.currentTarget) {
      return;
    }

    evt.preventDefault();
    const navControlType = evt.target.dataset.controlType;
    const searchParamType = evt.target.dataset.paramType;
    this._callback.navControlClick(navControlType, searchParamType);
  }
}

export { NavControls };
