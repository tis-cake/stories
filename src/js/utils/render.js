import { Abstract } from '../components/view/abstract';
import { RenderPosition } from '../consts';

const render = (container, element, place = RenderPosition.BEFOREEND) => {
  if (element instanceof Abstract) { element = element.getElement(); }

  if (place === RenderPosition.BEFOREBEGIN) { container.before(element); }
  if (place === RenderPosition.AFTERBEGIN) { container.prepend(element); }
  if (place === RenderPosition.BEFOREEND) { container.append(element); }
  if (place === RenderPosition.AFTEREND) { container.after(element); }
};

const renderMarkup = (container, template, place = RenderPosition.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};

const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Возможно удалять только компоненты-наследники');
  }

  component.getElement().remove();
  component.removeElement();
};

export { render, renderMarkup, remove };
