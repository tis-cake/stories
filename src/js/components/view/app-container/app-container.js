import { Abstract } from '../abstract';

const createAppContainerTemplate = () => {
  return (
    `
      <main class="main">
        <div class="board"></div>
      </main>
    `
  );
};

class AppContainer extends Abstract {
  getTemplate() {
    return createAppContainerTemplate();
  }

  getContainer() {
    return this.getElement().querySelector('.board');
  }
}

export { AppContainer };
