import { renderMarkup } from '../../../utils/render';
import {
  ThemeColor,
  SearchParam,
  CURRENT_THEME,
  faviconsPaths,
} from '../../../consts';

const ThemeColorClass = {
  [ThemeColor.LIGHT]: 'theme_light',
  [ThemeColor.DARK]: 'theme_dark',
};

const body = document.querySelector('body');
const isFaviconExisting = Boolean(document.querySelector('.favicon'));

class Theme {
  constructor() {
    this._currentColorTheme = CURRENT_THEME;
    this._currentColorClass = ThemeColorClass[this._currentColorTheme];
    this._prevColorTheme = (this._currentColorTheme === ThemeColor.LIGHT) ? ThemeColor.DARK : ThemeColor.LIGHT;
    this._prevColorClass = null;

    this._changeColorTheme = this._changeColorTheme.bind(this);
  }

  init() {
    this._addInitialBodyClass();
    this._addInitialHeadFavicons();
    this._checkDefaultThemeFavicons();
  }

  _addInitialBodyClass() {
    body.classList.add(this._currentColorClass);
  }

  _addInitialHeadFavicons() {
    if (!isFaviconExisting) {
      const head = document.querySelector('head');
      const faviconsTemplate = faviconsPaths.join('');
      renderMarkup(head, faviconsTemplate);
    }

    this._favicons = document.querySelectorAll('.favicon');
    this._faviconMsapplication = document.querySelector('.favicon-msapplication');
  }

  _checkDefaultThemeFavicons() {
    // проверяем - соответствуют ли фавиконки дефолтной цветовой теме (или из localStorage)
    const isDefaultThemeFavicons = Boolean(this._favicons[0].href.match(new RegExp(CURRENT_THEME)));

    if (!isDefaultThemeFavicons) {
      this._changeFavicon();
    }
  }

  _changeFavicon() {
    for (const favicon of this._favicons) {
      favicon.href = favicon.href.replace(this._prevColorTheme, this._currentColorTheme);
    }

    this._faviconMsapplication.content = this._faviconMsapplication.content.replace(this._prevColorTheme, this._currentColorTheme);
  }

  _changeColorTheme(themeColor) {
    if (themeColor === ThemeColor.LIGHT) {
      this._currentColorTheme = ThemeColor.LIGHT;
      this._prevColorTheme = ThemeColor.DARK;
    } else {
      this._currentColorTheme = ThemeColor.DARK;
      this._prevColorTheme = ThemeColor.LIGHT;
    }

    this._currentColorClass = ThemeColorClass[this._currentColorTheme];
    this._prevColorClass = ThemeColorClass[this._prevColorTheme];

    body.classList.remove(this._prevColorClass);
    body.classList.add(this._currentColorClass);

    this._changeFavicon();

    localStorage.setItem(SearchParam.THEME, themeColor);
  }

  getChangeColorTheme() {
    return this._changeColorTheme;
  }
}

export { Theme };
