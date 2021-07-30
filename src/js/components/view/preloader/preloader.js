import { Abstract } from '../abstract';

const createPreloaderTemplate = () => {
  return (
    `
      <div class='loader'>
        <img class="loader__logo loader__logo--dark" src="assets/images/preloader-dark.svg" alt="Stories" width="104" height="112" />
        <img class="loader__logo loader__logo--light" src="assets/images/preloader-light.svg" alt="Stories" width="104" height="112" />
      </div>
    `
  );
};

class Preloader extends Abstract {
  getTemplate() {
    return createPreloaderTemplate();
  }
}

export { Preloader };
