import { Api } from '../../../server/api';

import { Theme as ThemePresenter } from '../theme/theme';
import { Slider as SliderPresenter } from '../slider/slider';
import { Router as RouterPresenter } from '../router/router';

import { DataModel } from '../../model/data/data';

import { Vote } from '../../view/pages/vote';
import { Chart } from '../../view/pages/chart';
import { Leaders } from '../../view/pages/leaders';
import { Diagram } from '../../view/pages/diagram';
import { Activity } from '../../view/pages/activity';
import { Preloader } from '../../view/preloader/preloader';
import { NavControls } from '../../view/nav-controls/nav-controls';
import { AppContainer } from '../../view/app-container/app-container';

import { changeHash } from '../../../utils/router';
import { render, remove } from '../../../utils/render';
import { getExtraPageOptionsByIndex } from '../../../utils/common';
import {
  Page,
  SearchParam,
  NavControlType,
  ViewActionType,
  ModelEventType,
  CURRENT_PAGE_INDEX,
} from '../../../consts';

const PAGE_DEFAULT_INDEX = 0;

const PageComponent = {
  [Page.ACTIVITY]: Activity,
  [Page.DIAGRAM]: Diagram,
  [Page.LEADERS]: Leaders,
  [Page.CHART]: Chart,
  [Page.VOTE]: Vote,
};

class App {
  constructor(selector) {
    this._api = new Api();
    this._dataModel = new DataModel();

    this._themePresenter = new ThemePresenter();
    this._routerPresenter = new RouterPresenter();

    this._preloaderComponent = new Preloader();
    this._navControlsComponent = new NavControls();
    this._appContainerComponent = new AppContainer();

    this._isLoading = true;
    this._pageComponent = null;
    this._sliderPresenter = null;
    this._containerInside = null;
    this._containerOutside = document.querySelector(selector);
    this._changeColorTheme = this._themePresenter.getChangeColorTheme();

    this._renderPage = this._renderPage.bind(this);
    this._handlerViewAction = this._handlerViewAction.bind(this);
    this._handlerModelEvent = this._handlerModelEvent.bind(this);
    this._handlerNavControlClick = this._handlerNavControlClick.bind(this);
    this._handlerVoteButtonClick = this._handlerVoteButtonClick.bind(this);

    this._dataModel.subscribe(this._handlerModelEvent);
    this._themePresenter.init();
  }

  init() {
    this._renderAppContainer();

    if (this._isLoading) {
      this._renderPreloader();
    }

    this._fetchData();
  }

  _fetchData() {
    this._api.getData().then((data) => {
      this._dataModel.setCurrentPageIndex(CURRENT_PAGE_INDEX);
      this._dataModel.setData(ModelEventType.INIT, data);
    });
  }

  _renderPreloader() {
    render(this._containerInside, this._preloaderComponent);
  }

  _removePreloader() {
    remove(this._preloaderComponent);
  }

  _renderAppContainer() {
    render(this._containerOutside, this._appContainerComponent);
    this._containerInside = this._appContainerComponent.getContainer();
  }

  _renderNavControls(currentPageIndex) {
    this._navControlsComponent.addNavControlClickListener(this._handlerNavControlClick);
    this._hideExtraNavControls(currentPageIndex);

    render(this._containerInside, this._navControlsComponent);
  }

  _hideExtraNavControls(currentPageIndex) {
    const extraOptions = getExtraPageOptionsByIndex(currentPageIndex, this._lastPageIndex);
    this._navControlsComponent.addExtraClass(extraOptions);
  }

  _renderPage(pageIndex) {
    const { alias, data } = this._dataModel.getCurrentPageData(pageIndex);

    this._removePageComponent();
    this._renderPageComponent(alias, data);

    localStorage.setItem(SearchParam.PAGE, pageIndex);
  }

  _initSlider() {
    this._sliderPresenter = new SliderPresenter(this._pageComponent.getElement());
    this._sliderPresenter.init();
  }

  _removeSlider() {
    this._sliderPresenter.destroy();
    this._sliderPresenter = null;
  }

  _renderPageComponent(alias, data) {
    this._pageComponent = new PageComponent[alias](data);
    render(this._containerInside, this._pageComponent);

    if (alias === Page.VOTE) {
      this._pageComponent.addVoteButtonClickListener(this._handlerVoteButtonClick);
      this._initSlider();
    }
  }

  _removePageComponent() {
    if (this._pageComponent) {
      remove(this._pageComponent);
    }

    if (this._sliderPresenter) {
      this._removeSlider();
    }
  }

  _handlerViewAction(viewActionType, data) {
    if (viewActionType === ViewActionType.VOTE_USER) {
      this._dataModel.updateSelectedVote(ModelEventType.UPDATE_SELECTED_VOTE, data);
    }
  }

  // обрабатываем события пользователя (из view)
  _handlerModelEvent(modelEventType) {
    if (modelEventType === ModelEventType.INIT) {
      this._isLoading = false;
      this._removePreloader();

      this._lastPageIndex = this._dataModel.getLastPageIndex();
      const currentPageIndex = this._dataModel.getCurrentPageIndex();

      this._routerPresenter.init(this._lastPageIndex, this._renderPage, this._changeColorTheme);

      this._renderNavControls(currentPageIndex);
      this._renderPage(currentPageIndex);
    }

    if (modelEventType === ModelEventType.UPDATE_SELECTED_VOTE) {
      const currentPageIndex = this._dataModel.getCurrentPageIndex();

      changeHash({
        param: SearchParam.PAGE,
        value: currentPageIndex + 1,
      });
    }
  }

  // обрабатываем события данных (из model)
  _handlerNavControlClick(navControlType, searchParamType) {
    let param;
    let value;

    if (searchParamType === SearchParam.THEME) {
      param = SearchParam.THEME;
      value = navControlType;
    }

    if (searchParamType === SearchParam.PAGE) {
      if (navControlType === NavControlType.PAGE_NEXT) {
        value = this._dataModel.getCurrentPageIndex() + 1;
      }

      if (navControlType === NavControlType.PAGE_PREV) {
        value = this._dataModel.getCurrentPageIndex() - 1;
      }

      if (navControlType === NavControlType.PAGE_DEFAULT) {
        value = PAGE_DEFAULT_INDEX;
      }

      param = SearchParam.PAGE;
      this._hideExtraNavControls(value);
    }

    changeHash({ param, value });
  }

  _handlerVoteButtonClick(voteID) {
    this._handlerViewAction(ViewActionType.VOTE_USER, voteID);
  }
}

export { App };
