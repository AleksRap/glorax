document.addEventListener('DOMContentLoaded', () => {

  /** Мобильное меню */
  const btnMobile = document.querySelector('[data-mobile-nav="open"]');
  const btnCloseMobileMenu = document.querySelector('[data-mobile-nav="close"]');
  const mobileMenu = document.querySelector('.nav__mobile-list-wrap');
  btnMobile.addEventListener('click', () => {
    mobileMenu.classList.add('open');
  });
  btnCloseMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
  mobileMenu.addEventListener('click', event => {
    const link = event.target.closest('.nav__mobile-link');
    if (!link) return;

    mobileMenu.classList.remove('open');
  });

  /** Модалка */
  new Modal({
    idModal: 'modal-callback',
    selectorBtnOpen: '.callback-btn'
  });


  /** Прилипание меню после прокрутки */
  const header = document.querySelector('.header');
  const headerHeight = header.clientHeight;

  function transferNavbarSecond() {
    window.pageYOffset > headerHeight
      ? header.classList.add('header_color')
      : header.classList.remove('header_color');
  }

  transferNavbarSecond();
  window.addEventListener('scroll', transferNavbarSecond);


  /** Инициализация слайдеров swiper */
  new Swiper('.main-screen__swiper-container', {
    slidesPerView: 1,
    initialSlide: 0,
    loop: true,
    autoplay: true,
    delay: 4000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    preloadImages: false,
    lazy: true,
    loadOnTransitionStart: true
  });


  /** Плавная прокрутка до якоря */
  const anchors = document.querySelectorAll('[href^="#"]');
  const speed = 0.3;

  if (anchors.length) {
    anchors.forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();

        const yOffset = window.pageYOffset;
        const hash = e.target.href.replace(/[^#]*(.*)/, '$1');
        const topPosition = document.querySelector(hash).getBoundingClientRect().top;

        let start = null;

        requestAnimationFrame(step);

        function step(time) {
          if (start === null) start = time;

          const progress = time - start
          const directionScroll =
            topPosition < 0
              ? Math.max(yOffset - progress/speed, yOffset + topPosition)
              : Math.min(yOffset + progress/speed, yOffset + topPosition);

          window.scrollTo(0, directionScroll);

          if (directionScroll !== yOffset + topPosition) {
            requestAnimationFrame(step);
          } else {
            location.hash = hash;
          }
        }
      });
    });
  }


  /** Маска номера телефона на поля. Maskedinput */
  const input = document.querySelector('[data-input="tel"]');
  input.addEventListener("input", mask);
  input.addEventListener("focus", mask);
  input.addEventListener("blur", mask);


  /** Планировки */
  document.querySelectorAll('.card-tower').forEach(card => new Layouts(card));

  /** Галереи в карточках жк */
  document.querySelectorAll('.card-tower__img').forEach(wrapImg => new GalleryCards(wrapImg));
});


/** Управляем событиями */
class ManagementEvents {

  /**
   * На входе принимаем объект с параметрами
   * arr   - массив куда сохраняем события
   * el    - элемент, на который навешиваем обработчик
   * event - событие (str)
   * fn    - анонимная функция без вызова
   * @param data
   */
  static addEventToArr(data) {
    /** Добавляем событие в массив */
    data.arr.push({el: data.el, event: data.event, fn: data.fn});

    /** Вешаем слушатель */
    data.el.addEventListener(data.event, data.fn);

    return true
  }

  /**
   * На входе принимаем массив событий
   * @param arr
   */
  static removeEvents(arr) {
    /** Снимаем обработчики события */
    arr.forEach(item => {
      item.el.removeEventListener(item.event, item.fn)
    });

    /** Очищаем массив */
    arr.splice(0, arr.length);

    return true;
  }
}

/** Модалка */
class Modal {
  constructor(data) {
    this.arrEvents = [];
    this._modal = document.getElementById(data.idModal);
    this._modalWindow = this._modal.querySelector('[data-modal="window"]');

    this._btnsOpen = document.querySelectorAll(data.selectorBtnOpen);
    this._btnClose = this._modal.querySelector('[data-modal="close"]');

    this.bind();
  }

  open() {
    this._modal.classList.add('modal_open');
    this._modalWindow.classList.add('modal__window_open');
  }
  close() {
    this._modal.classList.remove('modal_open');
    this._modalWindow.classList.remove('modal__window_open');
  }

  bind() {
    /**
     * Открытие модалки по клику на кнопку
     */
    this._btnsOpen.forEach(btn => {
      ManagementEvents.addEventToArr({
        arr: this.arrEvents,
        el: btn,
        event: 'click',
        fn: () => this.open()
      });
    });


    /**
     * Закрытие модалки по клику вне нее
     */
    ManagementEvents.addEventToArr({
      arr: this.arrEvents,
      el: this._modal,
      event: 'click',
      fn: event => !event.target.closest('[data-modal=window]') && this.close()
    });

    /**
     * Закрытие модалки по клику на крестик
     */
    ManagementEvents.addEventToArr({
      arr: this.arrEvents,
      el: this._btnClose,
      event: 'click',
      fn: () => this.close()
    });
  }

  destroy() {
    ManagementEvents.removeEvents(this.arrEvents);
    this._modal.remove();
  }
}

/** Маска на телефон */
function setCursorPosition(pos, elem) {
  elem.focus();

  if (elem.setSelectionRange) {
    elem.setSelectionRange(pos, pos);
  } else if (elem.createTextRange) {
    const range = elem.createTextRange();

    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select()
  }
}
function mask(event) {
  const matrix = "+7 (___) ___ ____";
  let i = 0;
  const def = matrix.replace(/\D/g, '');
  let val = this.value.replace(/\D/g, '');

  if (def.length >= val.length) val = def;

  this.value = matrix.replace(/./g, function(str) {
    return /[_\d]/.test(str) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : str
  });

  if (event.type === "blur") {
    if (this.value.length === 2) this.value = ""
  } else {
    setCursorPosition(this.value.length, this)
  }
}

/** Планировки */
class Layouts {
  constructor(el) {
    this._wrap = el;

    this._body = this._wrap.querySelector('.card-tower__body');
    this._allBlock = this._wrap.querySelectorAll('[data-block]');

    this._btnAbout = this._wrap.querySelector('[data-btn="about"]');
    this._btnLayouts = this._wrap.querySelector('[data-btn="layouts"]');
    this._btnClose = this._wrap.querySelector('[data-btn="close"]');

    this._about = this._wrap.querySelector('.card-tower__general-information');
    this._layouts = this._wrap.querySelector('.card-tower__layouts');

    this._rowsWrap = this._wrap.querySelector('.card-tower__table-row-wrap');

    this._images = this._wrap.querySelector('.card-tower__table-img');

    this._bind();
  }

  showBlock(el) {
    this._body.removeAttribute('hidden');
    this._allBlock.forEach(block => block.setAttribute('hidden', true));
    el.removeAttribute('hidden');

    switch (el) {
      case this._about:
        this._btnAbout.classList.add('card-tower__btn_active');
        this._btnLayouts.classList.remove('card-tower__btn_active');
        break;
      default:
        this._btnLayouts.classList.add('card-tower__btn_active');
        this._btnAbout.classList.remove('card-tower__btn_active');
        break
    }
  }

  hideBlock() {
    this._body.setAttribute('hidden', true);
    this._allBlock.forEach(block => block.removeAttribute('hidden'));

    this._btnAbout.classList.remove('card-tower__btn_active');
    this._btnLayouts.classList.remove('card-tower__btn_active');
  }

  changeLayout(event) {
    const clickRow = event.target.closest('.card-tower__table-row');
    let index;

    [...this._rowsWrap.children].forEach((el, i) => {
      if (el === clickRow) index = i;
      el.classList.remove('active');
    });

    clickRow.classList.add('active');

    [...this._images.children].forEach((el, i) => {
      i === index
        ? el.removeAttribute('hidden')
        : el.setAttribute('hidden', true);
    });
  }

  _bind() {
    this._btnAbout.addEventListener('click', () => this.showBlock(this._about));
    this._btnLayouts.addEventListener('click', () => this.showBlock(this._layouts));
    this._btnClose.addEventListener('click', () => this.hideBlock());
    this._rowsWrap.addEventListener('click', event => this.changeLayout(event));
  }
}

/** Галерея внутри карточек жк */
class GalleryCards {
  constructor(el) {
    this._gallery = el;

    this._render();
    this._bind();
  }

  _render() {
    this._gallery.insertAdjacentHTML('beforeend', this._generateTemplate());
  }

  _bind() {
    const sections = this._gallery.querySelector('.card-tower__sections');
    sections.addEventListener('mouseover', event => {
      const section = event.target.closest('.card-tower__section');
      let index;

      [...sections.children].forEach((child, i) => {
        if (section === child) index = i;
        child.classList.remove('active');
      });
      [...this._gallery.children].forEach(img => img.classList.remove('active'));

      section.classList.add('active');
      [...this._gallery.children][index].classList.add('active');
    });
  }

  _generateTemplate() {
    const countImg = this._gallery.childElementCount;

    return `
      <div class="card-tower__sections">
        ${this._getTemplateSection(countImg)}
      </div>
    `;
  }

  _getTemplateSection(count) {
    let sectionTemplate = '';

    for (let i = 0; i < count; i++) {
      sectionTemplate += '<div class="card-tower__section"></div>'
    }

    return sectionTemplate
  }
}

/** Yandex api */
ymaps.ready(() => {
  const myMap = new ymaps.Map('map-yandex', {
    center: [59.93, 30.31],
    zoom: 11
  });

  const arrInfo = [
    {name: 'Ligovsky city - Второй квартал', coordinates: [59.906359, 30.344947], address: 'Санкт Петербург, Лиговский проспект, 232', img: 'images/real-estate/1.jpg'},
    {name: 'Ligovsky city - Первый квартал', coordinates: [59.905321, 30.342359], address: 'Санкт Петербург, Лиговский проспект, 271', img: 'images/real-estate/2.jpg'},
    {name: 'Golden City', coordinates: [59.941475, 30.193832], address: 'Санкт Петербург, ул. Челюскина, 4', img: 'images/real-estate/3.jpg'},
    {name: 'Английская миля', coordinates: [59.847010, 30.113936], address: 'Санкт Петербург, Петергофское ш., 78', img: 'images/real-estate/4.jpg'},
    {name: 'Grand House', coordinates: [59.925398, 30.373702], address: 'Санкт Петербург, Тележная ул., 17-19', img: 'images/real-estate/5.jpg'},
    {name: 'Олимп', coordinates: [56.256213, 37.975039], address: 'МО, г. Хотьково, ул. Михеенко, 25', img: 'images/real-estate/6.jpg'},
    {name: 'Мейн Хаус', coordinates: [60.028029, 30.416183], address: 'Санкт Петербург, Гражданский проспект, 107', img: 'images/real-estate/7.jpg'},
    {name: 'Твин Хаус', coordinates: [59.873853, 30.367225], address: 'Санкт Петербург, Будапештская, 2', img: 'images/real-estate/8.jpg'}
  ];

  const header = (img, address) => `
    <div class="card-map__header">
      <img src="${img}" alt="${address}">
    </div>
  `;

  const footer = (name, address) => `
    <div class="card-map__footer">
      <h2 class="card-map__title">${name}</h2>
      <p class="card-map__address">${address}</p>
    </div>
  `;

  arrInfo.forEach(({ name, coordinates, address, img }) => {
    myMap.geoObjects.add(new ymaps.Placemark(coordinates, {
      hintLayout: name,
      balloonContentHeader: header(img),
      balloonContentFooter: footer(name, address),
    }, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: 'images/other/point-map.png',
      iconImageSize: [34, 43],
      iconImageOffset: [-17, -43],
      iconContentOffset: [17, 50]
    }));
  });
});