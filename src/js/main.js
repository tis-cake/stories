import '../less/style.less';
import './polyfills/focus-visible.min';

import { App } from './components/presenter/app/app';

new App('#root').init();
