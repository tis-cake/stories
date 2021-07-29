class Swipe {
  constructor(slider) {
    this._sliderContainer = slider.sliderContainer;
    this._buttonSlidePrev = slider.buttonSlidePrev;
    this._buttonSlideNext = slider.buttonSlideNext;
    this._togglePrevSlide = slider.togglePrevSlide;
    this._toggleNextSlide = slider.toggleNextSlide;

    this._xDown = null;
    this._yDown = null;

    this._onSwipeDown = this._onSwipeDown.bind(this);
    this._onSwipeMove = this._onSwipeMove.bind(this);
    this._onSwipeUp = this._onSwipeUp.bind(this);
  }

  init() {
    this._sliderContainer.addEventListener('pointerdown', this._onSwipeDown);
  }

  _onSwipeDown(evt) {
    const isButtonNavigation = (evt.target === this._buttonSlidePrev || evt.target === this._buttonSlideNext);

    if (isButtonNavigation) {
      return;
    }

    this._xDown = evt.clientX;
    this._yDown = evt.clientY;

    this._sliderContainer.addEventListener('pointermove', this._onSwipeMove);
    this._sliderContainer.addEventListener('pointerup', this._onSwipeUp);
  }

  _onSwipeMove(evt) {
    const isButtonPrevDisabled = (this._buttonSlidePrev.getAttribute('disabled'));
    const isButtonNextDisabled = (this._buttonSlideNext.getAttribute('disabled'));

    if (!this._xDown || !this._yDown) {
      return;
    }

    const xUp = evt.clientX;
    const yUp = evt.clientY;

    const xDiff = this._xDown - xUp;
    const yDiff = this._yDown - yUp;

    if (Math.abs(xDiff) < Math.abs(yDiff)) {
      if (yDiff > 0 && !isButtonNextDisabled) {
        this._toggleNextSlide();
      } else if (yDiff < 0 && !isButtonPrevDisabled) {
        this._togglePrevSlide();
      }
    }

    this._xDown = null;
    this._yDown = null;
  }

  _onSwipeUp() {
    this._sliderContainer.removeEventListener('pointerup', this._onSwipeUp);
    this._sliderContainer.removeEventListener('pointermove', this._onSwipeMove);
  }
}

export { Swipe };
