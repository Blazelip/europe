window.addEventListener(`load`, () => {
  const API_URL = `https://echo.htmlacademy.ru`;
  const SLIDE_ACTIVE_CLASS = `tabs__item--active`;

  const StatusCode = {
    OK: 200
  };

  const page = document.querySelector(`.page-body`);

  const tabs = page.querySelector(`.js-tabs`);
  const slides = page.querySelectorAll(`.tabs__item`);

  const nav = page.querySelector(`.main-nav`);
  const navBtn = page.querySelector(`.main-nav__toggle`);

  const orderBtns = page.querySelectorAll(`.js-order`);
  const overlay = page.querySelector(`.overlay`);

  const modalOrder = page.querySelector(`.modal-order`);
  const modalForm = modalOrder.querySelector(`.modal-order__form`);
  const phone = modalForm.querySelector(`[name="phone"]`);
  const email = modalForm.querySelector(`[name="email"]`);
  const modalClose = modalOrder.querySelector(`.modal-order__close`);

  const modalThx = page.querySelector(`.modal-thx`);
  const modalThxClose = modalThx.querySelector(`.modal-thx__close`);

  let isStorageSupport = true;
  let storagePhone = "";
  let storageEmail = "";

  try {
      storagePhone = localStorage.getItem(`phone`);
      storageEmail = localStorage.getItem(`email`);
  } catch (err) {
      isStorageSupport = false;
  }

  const hidehAllSlides = () => {
    slides.forEach((slide) => {
      slide.classList.remove(`${SLIDE_ACTIVE_CLASS}`);
    });
  }

  const onTabClick = (evt) => {
    hidehAllSlides();

    const target = evt.target;

    if (target.classList.contains(`tabs__switcher-btn`)) {
      const id = target.dataset.btn;

      document.querySelector(`[data-tab="${id}`).classList.add(`${SLIDE_ACTIVE_CLASS}`);
    }
  };

  const switchScroll = () => {
    page.classList.toggle(`page-body--no-scroll`);
  };

  const onNavEscPress = (evt) => {
    if (evt.key === `Escape`) {
      document.removeEventListener(`keydown`, onNavEscPress);
      switchScroll();
      nav.classList.remove(`main-nav--opened`);
    }
  };

  const onModalThxPressEsc = (evt) => {
    if (evt.key === `Escape`) {
      switchScroll();
      closeThx();
    }
  }

  const onModalEscPress = (evt) => {
    if (evt.key === `Escape`) {
      switchScroll();
      closeModal();
    }
  };

  const onNavBtnClick = () => {
    nav.classList.toggle(`main-nav--opened`);
    switchScroll();
    document.addEventListener(`keydown`, onNavEscPress);
  };

  const onCloseCrossClick = () => {
    switchScroll();
    closeModal();
  };

  const onCloseCrossThxClick = () => {
    switchScroll();
    closeThx();
  };

  const openModal = () => {
    modalOrder.classList.add(`modal-order--open`);
    overlay.classList.add(`overlay--active`);
    document.addEventListener(`keydown`, onModalEscPress);
    modalClose.addEventListener(`click`, onCloseCrossClick);
    overlay.addEventListener(`click`, () => {
      closeModal();
    });
    modalForm.addEventListener(`submit`, onModalSubmit);
  };

  const closeModal = () => {
    modalClose.removeEventListener(`click`, onCloseCrossClick);
    document.removeEventListener(`keydown`, onModalEscPress);
    overlay.removeEventListener(`click`, () => {
      closeModal();
    });
    modalOrder.classList.remove(`modal-order--open`);
    overlay.classList.remove(`overlay--active`);
    modalForm.removeEventListener(`submit`, onModalSubmit);
  };

  const fillModal = () => {
    if (storagePhone) {
      phone.value = storagePhone;
    } else {
      phone.focus();
    }

    if (storageEmail) {
        email.value = storageEmail;
    }
  };

  const closeThx = () => {
    document.removeEventListener(`keydown`, onModalThxPressEsc);
    modalThxClose.removeEventListener(`click`, onCloseCrossThxClick);
    overlay.removeEventListener(`click`, () => {
      closeThx();
    });
    modalThx.classList.remove(`modal-thx--open`);
    overlay.classList.remove(`overlay--active`);
  };

  const openThx = () => {
    modalThx.classList.add(`modal-thx--open`);
    overlay.classList.add(`overlay--active`);
    overlay.addEventListener(`click`, () => {
      closeThx();
    });
    document.addEventListener(`keydown`, onModalThxPressEsc);
    modalThxClose.addEventListener(`click`, onCloseCrossThxClick);
  };

  const onModalSubmit = (evt) => {
    evt.preventDefault();

    if (isStorageSupport) {
      localStorage.setItem(`phone`, phone.value);
      localStorage.setItem(`email`, email.value);
    }

    sendData(new FormData(modalForm));
  };

  const onOrderBtnClick = (evt) => {
    evt.preventDefault();
    openModal();
    switchScroll();
    fillModal();
  };

  const sendData = (data) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    getServerResponse(xhr);

    xhr.open(`POST`, API_URL);
    xhr.send(data);
  };

  const getServerResponse = (xhr) => {
    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        closeModal();
        openThx();
      } else {
        window.alert(`Форма не была отправлена`);
      }
    });
  };

  nav.classList.remove(`main-nav--nojs`);

  navBtn.addEventListener(`click`, onNavBtnClick);
  orderBtns.forEach((btn) => {
    btn.addEventListener(`click`, onOrderBtnClick)
  });
  tabs.addEventListener(`click`, onTabClick);

});
