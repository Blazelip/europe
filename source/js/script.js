window.addEventListener(`load`, () => {
  const SLIDE_ACTIVE_CLASS = `places__original-item--active`;

  const initSlider = (slideActiveClass) => {
    const slides = document.querySelectorAll(`.js-slider li`);
    const buttons = document.querySelectorAll(`.js-tabs button`);

    const hidehAllSlides = () => {
        slides.forEach((slide) => {
          slide.classList.remove(slideActiveClass);
        });
    }

    const showActiveSlide = (index) => {
        hidehAllSlides();
        slides[index].classList.add(slideActiveClass);
    }

    buttons.forEach((button, id) => {
      button.addEventListener(`click`, () => {
        showActiveSlide(id);
      });
    });
  }

  initSlider(SLIDE_ACTIVE_CLASS);

});
