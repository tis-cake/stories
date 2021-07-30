import { AbstractPages } from './abstract';

const GraphTime = {
  DAYS: 7,
  HOURS_DAY: 24,
  HOURS_HALF_DAY: 12,
};

const GraphCategory = {
  0: 'min',
  1: 'mid',
  2: 'mid',
  3: 'max',
  4: 'max',
  5: 'extra',
  6: 'extra',
};

const getGraphsHalf = (graphs) => {
  const graphsHalf = [];

  for (let i = 0; i < graphs.length; i++) {
    const valueCurrent = graphs[i];
    const valueNext = graphs[i + 1];
    // const arithmeticMean = Math.round((valueCurrent + valueNext) / 2);
    const arithmeticMean = valueCurrent + valueNext;

    graphsHalf.push(arithmeticMean);

    i++;
  }

  return graphsHalf;
};

const createGraphMarkup = (graphValue) => {
  const graphCategory = GraphCategory[graphValue];

  return (
    `
      <li class="activity__graph">
        <picture class="activity__picture activity__picture--theme-dark">
          <source
            type="image/webp"
            srcset="assets/images/1x/decor/graph/${graphCategory}-dark.webp 1x,
                    assets/images/2x/decor/graph/${graphCategory}-dark.webp 2x,
                    assets/images/3x/decor/graph/${graphCategory}-dark.webp 3x,
                    assets/images/4x/decor/graph/${graphCategory}-dark.webp 4x"
          >

          <img
            class="activity__figure activity__figure--${graphCategory}"
            src="assets/images/1x/decor/graph/${graphCategory}-dark.png"
            srcset="assets/images/2x/decor/graph/${graphCategory}-dark.png 2x,
                    assets/images/3x/decor/graph/${graphCategory}-dark.png 3x,
                    assets/images/4x/decor/graph/${graphCategory}-dark.png 4x"
            alt="${graphCategory}"
          >
        </picture>
        <picture class="activity__picture activity__picture--theme-light">
          <source
            type="image/webp"
            srcset="assets/images/1x/decor/graph/${graphCategory}-light.webp 1x,
                    assets/images/2x/decor/graph/${graphCategory}-light.webp 2x,
                    assets/images/3x/decor/graph/${graphCategory}-light.webp 3x,
                    assets/images/4x/decor/graph/${graphCategory}-light.webp 4x"
          >

          <img
            class="activity__figure activity__figure--${graphCategory}"
            src="assets/images/1x/decor/graph/${graphCategory}-light.png"
            srcset="assets/images/2x/decor/graph/${graphCategory}-light.png 2x,
                    assets/images/3x/decor/graph/${graphCategory}-light.png 3x,
                    assets/images/4x/decor/graph/${graphCategory}-light.png 4x"
            alt="${graphCategory}"
          >
        </picture>
      </li>
    `
  );
};

const createGraphsHalfMarkup = (graphs) => {
  const graphsHalf = [];
  for (let i = 0; i < GraphTime.DAYS; i++) {
    graphsHalf.push(getGraphsHalf(graphs[i]));
  }

  const graphsHalfMarkup = [];
  for (let i = 0; i < GraphTime.HOURS_HALF_DAY; i++) {
    for (let j = 0; j < GraphTime.DAYS; j++) {
      graphsHalfMarkup.push(createGraphMarkup(graphsHalf[j][i]));
    }
  }

  return graphsHalfMarkup.join('');
};

const createGraphsFullMarkup = (graphs) => {
  return graphs.map((graphDay) => {
    return graphDay.map((graphHour) => {
      return createGraphMarkup(graphHour);
    }).join('');
  }).join('');
};

const createActivityTemplate = (data) => {
  const {
    title,
    subtitle,
    data: activity,
  } = data;

  const graphs = Object.values(activity);
  const graphsFullMarkup = createGraphsFullMarkup(graphs);
  const graphsHalfMarkup = createGraphsHalfMarkup(graphs);

  return (
    `
      <section class="activity container">
        <div class="board__text-wrap activity__text-wrap">
          <h1 class="board__title activity__title title">
            ${title}
          </h1>
          <h2 class="board__subtitle activity__subtitle">
            ${subtitle}
          </h2>
        </div>
        <ul class="activity__list-graphs activity__list-graphs--full">
          ${graphsFullMarkup}
        </ul>
        <ul class="activity__list-graphs activity__list-graphs--half">
          ${graphsHalfMarkup}
        </ul>
        <ul class="activity__list-legends">
          <li class="activity__legend">
            <span class="activity__bar-color activity__bar-color--step"></span>
            <p class="activity__bar-desc activity__bar-desc--full">
              1 час
            </p>
            <p class="activity__bar-desc activity__bar-desc--half">
              2 часа
            </p>
          </li>
          <li class="activity__legend">
            <span class="activity__bar-color activity__bar-color--min"></span>
            <p class="activity__bar-desc">
              0
            </p>
          </li>
          <li class="activity__legend">
            <span class="activity__bar-color activity__bar-color--mid"></span>
            <p class="activity__bar-desc">
              1 — 2
            </p>
          </li>
          <li class="activity__legend">
            <span class="activity__bar-color activity__bar-color--max"></span>
            <p class="activity__bar-desc">
              3 — 4
            </p>
          </li>
          <li class="activity__legend">
            <span class="activity__bar-color activity__bar-color--extra"></span>
            <p class="activity__bar-desc">
              5 — 6
            </p>
          </li>
        </ul>
      </section>
    `
  );
};

class Activity extends AbstractPages {
  getTemplate() {
    return createActivityTemplate(this._data);
  }
}

export { Activity };
