import { AbstractPages } from './abstract';

import { getIntegerNumber } from '../../../utils/common';

const DiagramIconCategory = {
  0: 'largest',
  1: 'large',
  2: 'small',
  3: 'smallest',
};

const createCategoryMarkup = (category, index) => {
  const { title, valueText, differenceText } = category;

  const iconCategory = DiagramIconCategory[index];

  const valueTextNumber = getIntegerNumber(valueText);
  const differenceTextNumber = getIntegerNumber(differenceText);

  return (
    `
      <li class="diagram__item">
        <span class="diagram__icon-wrap diagram__icon-wrap--${iconCategory}">
          <picture class="diagram__picture diagram__picture--icon diagram__picture--theme-dark">
            <source
              type="image/webp"
              srcset="assets/images/1x/decor/circle/circle-dark-${iconCategory}.webp 1x,
                      assets/images/2x/decor/circle/circle-dark-${iconCategory}.webp 2x,
                      assets/images/3x/decor/circle/circle-dark-${iconCategory}.webp 3x,
                      assets/images/4x/decor/circle/circle-dark-${iconCategory}.webp 4x"
            >

            <img
              class="diagram__icon"
              src="assets/images/1x/decor/circle/circle-dark-${iconCategory}.png"
              srcset="assets/images/2x/decor/circle/circle-dark-${iconCategory}.png 2x,
                      assets/images/3x/decor/circle/circle-dark-${iconCategory}.png 3x,
                      assets/images/4x/decor/circle/circle-dark-${iconCategory}.png 4x"
              alt="Декоративный элемент"
              width="16"
              height="16"
              aria-hidden="true"
            >
          </picture>
          <picture class="diagram__picture diagram__picture--icon diagram__picture--theme-light">
            <source
              type="image/webp"
              srcset="assets/images/1x/decor/circle/circle-light-${iconCategory}.webp 1x,
                      assets/images/2x/decor/circle/circle-light-${iconCategory}.webp 2x,
                      assets/images/3x/decor/circle/circle-light-${iconCategory}.webp 3x,
                      assets/images/4x/decor/circle/circle-light-${iconCategory}.webp 4x"
            >

            <img
              class="diagram__icon"
              src="assets/images/1x/decor/circle/circle-light-${iconCategory}.png"
              srcset="assets/images/2x/decor/circle/circle-light-${iconCategory}.png 2x,
                      assets/images/3x/decor/circle/circle-light-${iconCategory}.png 3x,
                      assets/images/4x/decor/circle/circle-light-${iconCategory}.png 4x"
              alt="Декоративный элемент"
              width="16"
              height="16"
              aria-hidden="true"
            >
          </picture>
        </span>
        <p class="diagram__value-desc">
          ${title}
        </p>
        <p class="diagram__value-change">
          +${differenceTextNumber}
        </p>
        <p class="diagram__value-current">
          ${valueTextNumber}
        </p>
      </li>
    `
  );
};

const createCategoriesMarkup = (categories) => {
  return categories
    .map((el, i) => createCategoryMarkup(el, i))
    .join('');
};

const createDiagramTemplate = (data) => {
  const { title, subtitle, totalText, differenceText, categories } = data;

  const categoriesMarkup = createCategoriesMarkup(categories);

  return (
    `
      <section class="diagram container">
        <div class="board__text-wrap diagram__text-wrap">
          <h1 class="board__title diagram__title title">
            ${title}
          </h1>
          <h2 class="board__subtitle diagram__subtitle">
            ${subtitle}
          </h2>
        </div>

        <div class="diagram__wrap">
          <figure class="diagram__figure">
            <figcaption class="diagram__figcaption">
              <h2 class="diagram__figcaption-title title">
                ${totalText}
              </h2>
              <h3 class="diagram__figcaption-subtitle subtitle">
                ${differenceText}
              </h3>
            </figcaption>

            <picture class="diagram__picture diagram__picture--diagram diagram__picture--theme-dark">
              <source
                type="image/webp"
                srcset="assets/images/1x/decor/diagram/diagram-dark.webp 1x,
                        assets/images/2x/decor/diagram/diagram-dark.webp 2x,
                        assets/images/3x/decor/diagram/diagram-dark.webp 3x,
                        assets/images/4x/decor/diagram/diagram-dark.webp 4x"
              >

              <img
                class="diagram__image"
                src="assets/images/1x/decor/diagram/diagram-dark.png"
                srcset="assets/images/2x/decor/diagram/diagram-dark.png 2x,
                        assets/images/3x/decor/diagram/diagram-dark.png 3x,
                        assets/images/4x/decor/diagram/diagram-dark.png 4x"
                alt="Диаграмма. ${title}"
              >
            </picture>
            <picture class="diagram__picture diagram__picture--diagram diagram__picture--theme-light">
              <source
                type="image/webp"
                srcset="assets/images/1x/decor/diagram/diagram-light.webp 1x,
                        assets/images/2x/decor/diagram/diagram-light.webp 2x,
                        assets/images/3x/decor/diagram/diagram-light.webp 3x,
                        assets/images/4x/decor/diagram/diagram-light.webp 4x"
              >

              <img
                class="diagram__image"
                src="assets/images/1x/decor/diagram/diagram-light.png"
                srcset="assets/images/2x/decor/diagram/diagram-light.png 2x,
                        assets/images/3x/decor/diagram/diagram-light.png 3x,
                        assets/images/4x/decor/diagram/diagram-light.png 4x"
                alt="Диаграмма. ${title}"
              >
            </picture>
          </figure>

          <ul class="diagram__list">
            ${categoriesMarkup}
          </ul>
        </div>
      </section>
    `
  );
};

class Diagram extends AbstractPages {
  getTemplate() {
    return createDiagramTemplate(this._data);
  }
}

export { Diagram };
