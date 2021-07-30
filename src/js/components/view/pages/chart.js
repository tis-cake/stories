import { AbstractPages } from './abstract';

const CHART_MAX_HEIGHT_PERCENT = 70;
const CHART_MAX_EMPTY_COUNT = 2;

const createLeaderMarkup = (leader, index) => {
  const { name, avatar, valueText } = leader;

  const placeNumber = index + 1;

  return (
    `
      <li class="chart__leader people__item">
        <span class="people__img-wrap">
          <img
            class="people__img"
            src="${avatar}"
            alt="Место №${placeNumber}. ${name}"
          >
        </span>
        <span class="people__name">
          ${name}
        </span>
        <span class="people__commit-count caption">
          ${valueText}
        </span>
      </li>
    `
  );
};

const createListLeadersMarkup = (leaders) => {
  return leaders
    .map((el, i) => createLeaderMarkup(el, i))
    .join('');
};

const createStatMarkup = (stat, maxValue) => {
  const { title, value, active } = stat;

  const heightPercent = `${((value * CHART_MAX_HEIGHT_PERCENT) / maxValue)}%`;

  const activeClass = active
    ? 'chart__stat chart__stat--active'
    : 'chart__stat';

  const emptyClass = (heightPercent === '0%')
    ? 'chart__stat--empty'
    : '';

  return (
    `
      <li class="${activeClass} ${emptyClass}" style="height: ${heightPercent}">
        <p class="chart__amount-commits subtitle">${value}</p>
        <p class="chart__sprint-number">${title}</p>
      </li>
    `
  );
};

const createListStatsMarkup = (stats) => {
  const statsReverse = [];

  // удаляем излишки пустых колонок
  const activeIndex = stats.findIndex((el) => el.active === true);
  const statsSliced = stats.slice(0, activeIndex + (CHART_MAX_EMPTY_COUNT + 1));

  // реверсируем и находим максимальное значение
  let maxValue = 0;
  for (let i = 0; i < statsSliced.length; i++) {
    if (maxValue < statsSliced[i].value) {
      maxValue = statsSliced[i].value;
    }
    statsReverse[i] = statsSliced[(statsSliced.length - 1) - i];
  }

  return statsReverse
    .map((el) => createStatMarkup(el, maxValue))
    .join('');
};

const createChartTemplate = (data) => {
  const { title, subtitle, values, users } = data;

  const listStatsMarkup = createListStatsMarkup(values);
  const listLeadersMarkup = createListLeadersMarkup(users);

  return (
    `
      <section class="chart container">
        <div class="board__text-wrap chart__text-wrap">
          <h1 class="board__title chart__title title">
            ${title}
          </h1>
          <h2 class="board__subtitle chart__subtitle">
            ${subtitle}
          </h2>
        </div>
        <ul class="chart__list-stats">
          ${listStatsMarkup}

          <li class="chart__stat chart__stat--hidden"></li>
        </ul>
        <ul class="chart__list-leaders people people--row">
          ${listLeadersMarkup}
        </ul>
      </section>
    `
  );
};

class Chart extends AbstractPages {
  getTemplate() {
    return createChartTemplate(this._data);
  }
}

export { Chart };
