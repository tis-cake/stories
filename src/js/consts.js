const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const Page = {
  ACTIVITY: 'activity',
  DIAGRAM: 'diagram',
  LEADERS: 'leaders',
  CHART: 'chart',
  VOTE: 'vote',
};

const ThemeColor = {
  LIGHT: 'light',
  DARK: 'dark',
};

const SearchParam = {
  PAGE: 'page',
  THEME: 'theme',
};

const NavControlType = {
  THEME_DARK: ThemeColor.DARK,
  THEME_LIGHT: ThemeColor.LIGHT,
  PAGE_NEXT: 'page-next',
  PAGE_PREV: 'page-prev',
  PAGE_DEFAULT: 'page-default',
};

const DefaultSetupOption = {
  PAGE_DEFAULT: 0,
  THEME_DEFAULT: ThemeColor.LIGHT,
};

const ViewActionType = { VOTE_USER: 'VOTE_USER' };

const ModelEventType = {
  INIT: 'INIT',
  UPDATE_SELECTED_VOTE: 'UPDATE_SELECTED_VOTE',
};

const SELECTED_USER_EMOJI = '👍';
const CURRENT_PAGE_INDEX = Number((localStorage.getItem(SearchParam.PAGE) ?? DefaultSetupOption.PAGE_DEFAULT));
const CURRENT_THEME = (localStorage.getItem(SearchParam.THEME) ?? DefaultSetupOption.THEME_DEFAULT);

const faviconsPaths = [
  `<link class="favicon" rel="apple-touch-icon" sizes="57x57" href="assets/favicon/${CURRENT_THEME}/apple-icon-57x57.png">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="60x60" href="assets/favicon/${CURRENT_THEME}/apple-icon-60x60.png">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="72x72" href="assets/favicon/${CURRENT_THEME}/apple-icon-72x72.png">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="76x76" href="assets/favicon/${CURRENT_THEME}/apple-icon-76x76.png">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="114x114" href="assets/favicon/${CURRENT_THEME}/apple-icon-114x114.pn,g">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="120x120" href="assets/favicon/${CURRENT_THEME}/apple-icon-120x120.png">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="144x144" href="assets/favicon/${CURRENT_THEME}/apple-icon-144x144.png">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="152x152" href="assets/favicon/${CURRENT_THEME}/apple-icon-152x152.png">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="180x180" href="assets/favicon/${CURRENT_THEME}/apple-icon-180x180.png">`,
  `<link class="favicon" rel="icon" type="image/png" sizes="192x192"  href="assets/favicon/${CURRENT_THEME}/android-icon-192x192.png">`,
  `<link class="favicon" rel="icon" type="image/png" sizes="32x32" href="assets/favicon/${CURRENT_THEME}/favicon-32x32.png">`,
  `<link class="favicon" rel="icon" type="image/png" sizes="96x96" href="assets/favicon/${CURRENT_THEME}/favicon-96x96.png">`,
  `<link class="favicon" rel="icon" type="image/png" sizes="16x16" href="assets/favicon/${CURRENT_THEME}/favicon-16x16.png">`,
  `<link class="favicon" rel="manifest" href="assets/favicon/${CURRENT_THEME}/manifest.json">`,
  '<meta name="msapplication-TileColor" content="#ffffff">',
  `<meta class="favicon-msapplication" name="msapplication-TileImage" content="assets/favicon/${CURRENT_THEME}/ms-icon-144x144.png">`,
  '<meta name="theme-color" content="#ffffff">',
];

export {
  RenderPosition,
  Page,
  ThemeColor,
  SearchParam,
  NavControlType,
  ViewActionType,
  ModelEventType,

  SELECTED_USER_EMOJI,
  CURRENT_PAGE_INDEX,
  CURRENT_THEME,

  faviconsPaths,
};
