import { getHashParam } from '../../../utils/router';
import {
  ThemeColor,
  SearchParam,
  CURRENT_PAGE_INDEX,
  CURRENT_THEME,
} from '../../../consts';

class Router {
  constructor() {
    this._currentPageIndex = CURRENT_PAGE_INDEX;
    this._currentThemeColor = CURRENT_THEME;

    const hashParamPage = `${SearchParam.PAGE}=${this._currentPageIndex}`;
    const hashParamTheme = `${SearchParam.THEME}=${this._currentThemeColor}`;

    this._hash = `/?${hashParamPage}&${hashParamTheme}`;

    this._handleHashChange = this._handleHashChange.bind(this);
  }

  init(lastPageIndex, renderPage, changeColorTheme) {
    this._lastPageIndex = lastPageIndex;
    this._renderPage = renderPage;
    this._changeColorTheme = changeColorTheme;

    window.location.hash = this._hash;
    window.addEventListener('hashchange', this._handleHashChange);
  }

  _handleHashChange() {
    const newPageIndex = getHashParam(SearchParam.PAGE);
    const newThemeColor = getHashParam(SearchParam.THEME);

    if (newPageIndex) {
      this._handleParamPageChange(newPageIndex);
    }

    if (newThemeColor) {
      this._handleParamThemeChange(newThemeColor);
    }
  }

  _handleParamPageChange(pageIndex) {
    const isPageExisting = (pageIndex <= this._lastPageIndex);

    if (isPageExisting && this._currentPageIndex !== pageIndex) {
      this._currentPageIndex = pageIndex;
      this._renderPage(pageIndex);
    }
  }

  _handleParamThemeChange(themeColor) {
    const isThemeExisting = (Object.values(ThemeColor).some((color) => color === themeColor));

    if (isThemeExisting && this._currentThemeColor !== themeColor) {
      this._currentThemeColor = themeColor;
      this._changeColorTheme(themeColor);
    }
  }
}

export { Router };
