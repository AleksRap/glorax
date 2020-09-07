document.addEventListener('DOMContentLoaded', () => {
  const screenWidth = document.documentElement.clientWidth;


  /** Выделение пунктов меню в зависимости от позиции скролла */
  const arrIdAnchor = ['projects', 'about-us', 'map', 'rooms'];
  const arrMenuItems = document.querySelectorAll('.nav__item');
  const arrMobileMenuItems = document.querySelectorAll('.nav__mobile-item');
  const arrYPositionAnchor = arrIdAnchor.map(id => {
    const headerHeight = document.querySelector('.header').clientHeight;
    return window.pageYOffset + document.querySelector(`#${id}`).getBoundingClientRect().top - headerHeight;
  });

  window.addEventListener('scroll', () => {
    const currentScroll = document.documentElement.scrollTop;
    let index = null;

    for (let i = 0; i < arrYPositionAnchor.length; i ++) {
      const lastAnchor = arrYPositionAnchor[i + 1] || document.body.scrollHeight;

      if (currentScroll >= arrYPositionAnchor[i] && currentScroll < lastAnchor) {
        index = i;
        break;
      }
    }

    for (let i = 0; i < arrMenuItems.length; i++) {
      arrMenuItems[i].classList.remove('select');
      arrMobileMenuItems[i].classList.remove('select');
    }

    if (index !== null) {
      arrMenuItems[index].classList.add('select');
      arrMobileMenuItems[index].classList.add('select');
    }
  });


  /** Мобильное меню */
  const btnMobile = document.querySelector('[data-mobile-nav="open"]');
  const btnCloseMobileMenu = document.querySelector('[data-mobile-nav="close"]');
  const btnModalMobile = document.querySelector('.nav__callback-btn_mobile');
  const mobileMenu = document.querySelector('.nav__mobile-list-wrap');

  btnMobile.addEventListener('click', () => {
    mobileMenu.classList.add('open');
  });
  btnCloseMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
  btnModalMobile.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
  mobileMenu.addEventListener('click', event => {
    const link = event.target.closest('.nav__mobile-link');
    if (!link) return;

    mobileMenu.classList.remove('open');
  });
  window.addEventListener('click', event => {
    const link = event.target.closest('.nav__mobile-list-wrap');
    const btnMobile = event.target.closest('[data-mobile-nav="open"]');
    if (link || btnMobile) return;

    mobileMenu.classList.remove('open');
  });


  /** Модалка */
  new Modal({
    idModal: 'modal-callback',
    selectorBtnOpen: '[data-open-modal]'
  });

  /** Модалка успешной отправки */
  const modalSendSuccess = new Modal({
    idModal: 'modal-send-success'
  });


  /** Открытие/закрытие карточек проектов на мобильных */
  if (screenWidth < 1000) {
    const cards = document.querySelector('.projects__cards');

    cards.addEventListener('click', event => {
      const card = event.target.closest('.card-real-estate');
      if (!card) return;

      card.classList.toggle('open');
    })
  }


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
    autoplay: {
      delay: 6000,
    },
    speed: 1500,
    pagination: {
      el: '.main-screen__pagination',
      clickable: true,
    }
  });
  new Swiper('.card-tower__swiper-container', {
    slidesPerView: 1,
    initialSlide: 0,
    loop: true,
    autoplay: {
      delay: 6000,
    },
    speed: 1500,
    pagination: {
      el: '.card-tower__pagination',
      clickable: true,
    }
  });


  /** Плавная прокрутка до якоря */
  const anchors = document.querySelectorAll('[href^="#"]');
  const speed = 0.3;

  anchors.forEach(anchor => {
    anchor.addEventListener('click', event => {
      event.preventDefault();

      const yOffset = window.pageYOffset;
      const hash = event.target.href.replace(/[^#]*(.*)/, '$1');
      const topPosition = document.querySelector(hash).getBoundingClientRect().top;

      let startTimestamp = null;

      requestAnimationFrame(step);

      function step(timestamp) {
        if (startTimestamp === null) startTimestamp = timestamp;
        const currentTimestamp = timestamp - startTimestamp;
        const headerHeight = document.querySelector('.header').clientHeight;
        const stopPosition =  yOffset + topPosition - headerHeight;

        const directionScroll =
          topPosition < 0
            ? Math.max(yOffset - currentTimestamp/speed, stopPosition)
            : Math.min(yOffset + currentTimestamp/speed, stopPosition);

        window.scrollTo(0, directionScroll);

        directionScroll !== stopPosition && requestAnimationFrame(step);
      }
    });
  });


  /** Маска номера телефона на поля. Maskedinput */
  const input = document.querySelector('[data-input="tel"]');
  input.addEventListener("input", mask);
  input.addEventListener("focus", mask);
  input.addEventListener("blur", mask);


  /** Планировки */
  document.querySelectorAll('.card-tower').forEach(card => new Layouts(card));


  /** Галереи в карточках ЖК */
  document.querySelectorAll('.card-tower__img_desktop').forEach((wrapImg, index) => new GalleryCards(wrapImg, index));


  /** Форма */
  const form = document.querySelector('[data-form]');
  const btn = form.querySelector('[data-send]');
  const error = form.querySelector('[data-form="error"]');
  const loader = form.querySelector('[data-loader]');

  const name = form.querySelector('[data-form="name"]');
  const phone = form.querySelector('[data-form="phone"]');
  const projectId = form.querySelector('[data-form="project_id"]');
  const time = form.querySelector('[data-form="time"]');

  const arrFormAreas = [name, phone, projectId, time];
  arrFormAreas.forEach(area => area.addEventListener('input', () => error.classList.remove('active')));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    btn.setAttribute('disabled', true);
    loader.classList.add('active');

    const body = {
      name: name.value,
      phone: phone.value,
      projectId: projectId.value,
      time: time.value
    };


    /**
     * Объект с данными для Comagic
     * @type {{phone, name, message, email: string}}
     */
    const bodySpecialForComagic = {
      name: body.name,
      email: '',
      phone: body.phone,
      message: body.time
    }

    Comagic.addOfflineRequest(bodySpecialForComagic);

    function clearAreasForm() {
      name.value = '';
      phone.value = '';
      projectId.value = '1';
      time.value = '';
    }

    fetch('/api/request/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(({status, message = ''}) => {
        if (status !== 'success') throw new Error(message);

        modalSendSuccess.open();

        clearAreasForm();

        dataLayer.push({'event': 'formsuccess'});
      })
      .catch(e => {
        error.innerHTML = `Произошла ошибка, попробуйте снова<br>(${e})`;
        error.classList.add('active');
      })
      .finally(() => {
        btn.removeAttribute('disabled');
        loader.classList.remove('active');

        /** Удаляем ошибку после закрытия и очищаем поля */
        document.addEventListener('closeModal', () => {
          error.classList.remove('active');
          clearAreasForm();
        }, {once: true});
      });
  });


  /** Менять активный ЖК в селекте при нажатии заявка на бронь внутри карточки */
  const btnsOrder = document.querySelectorAll('[data-value-select]');
  btnsOrder.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      projectId.value = e.target.closest('button').dataset.valueSelect;
    });
  });
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
    this._btnsClose = this._modal.querySelectorAll('[data-modal="close"]');

    this.bind();
  }

  open() {
    this.closeAllModals();

    this._modal.classList.add('modal_open');
    this._modalWindow.classList.add('modal__window_open');
  }
  close() {
    this._modal.classList.remove('modal_open');
    this._modalWindow.classList.remove('modal__window_open');

    this.generateEvent();
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
    this._btnsClose.forEach(btnClose => {
      ManagementEvents.addEventToArr({
        arr: this.arrEvents,
        el: btnClose,
        event: 'click',
        fn: () => this.close()
      });
    });
  }

  closeAllModals() {
    [...document.querySelectorAll('.modal')].forEach(modal => {
      modal.classList.remove('modal_open');

      const textarea = modal.querySelector('textarea');
      if (textarea) textarea.value = '';
    });
  }

  generateEvent() {
    const eventClose = new Event('closeModal', {bubbles: true});
    this._btnsClose.forEach(btnClose => btnClose.dispatchEvent(eventClose));
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

  if (event.type === 'blur') {
    if (this.value.length === 2) this.value = ''
  } else {
    setCursorPosition(this.value.length, this)
  }
}

/** Планировки */
class Layouts {
  constructor(el) {
    this._wrap = el;
    this._allCards = document.querySelectorAll('.card-tower');

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
    this._closeAllCards();

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
        break;
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
    if (!clickRow) return;
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

  _closeAllCards() {
    this._allCards.forEach(card => {
      card.querySelector('.card-tower__body').setAttribute('hidden', true);
      const btns = card.querySelectorAll('.card-tower__btn');

      btns.forEach(btn => btn.classList.remove('card-tower__btn_active'));
    });
  }

  _toggleBlock(event, el) {
    event.target.closest('.card-tower__btn').classList.contains('card-tower__btn_active')
      ? this.hideBlock()
      : this.showBlock(el);
  }

  _bind() {
    this._btnAbout.addEventListener('click', event => this._toggleBlock(event, this._about));
    this._btnLayouts.addEventListener('click', event => this._toggleBlock(event, this._layouts));
    this._btnClose.addEventListener('click', () => this.hideBlock());
    this._rowsWrap.addEventListener('mouseover', event => this.changeLayout(event));
  }
}

/** Галерея внутри карточек жк */
class GalleryCards {
  constructor(el, index) {
    this._gallery = el;
    this._index = index;

    this._render();
    this._bind();

    /** Рефрешим либу галереи */
    refreshFsLightbox();
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
    sections.addEventListener('mouseout', () => {
      [...sections.children].forEach(child => child.classList.remove('active'));
    });
  }

  _generateTemplate() {
    const countImg = this._gallery.childElementCount;
    const links = [];

    [...this._gallery.children].forEach(img => links.push(img.src.split(location.origin).join('')));

    return `
      <div class="card-tower__sections">
        ${this._getTemplateSection(countImg, links)}
      </div>
    `;
  }

  _getTemplateSection(count, links) {
    let sectionTemplate = '';

    for (let i = 0; i < count; i++) {
      sectionTemplate += `<a class="card-tower__section" href="${links[i]}" data-fslightbox="gallery-${this._index}"></a>`
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

  const arrInfo = JSON.parse(document.getElementById('json').textContent);

  const header = (img, address, id) => `
    <a class="card-map__header" href="#${id}">
      <img src="${img}" alt="${address}">
    </a>
  `;

  const footer = (name, address, id) => `
    <a class="card-map__footer" href="#${id}">
      <h2 class="card-map__title">${name}</h2>
      <p class="card-map__address">${address}</p>
    </a>
  `;

  arrInfo.forEach(({ name, coordinates, address, img, id }) => {
    myMap.geoObjects.add(new ymaps.Placemark(coordinates, {
      hintLayout: name,
      balloonContentHeader: header(img, id),
      balloonContentFooter: footer(name, address, id),
    }, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: 'images/other/point-map.png',
      iconImageSize: [34, 43],
      iconImageOffset: [-17, -43],
      iconContentOffset: [17, 50]
    }));
  });
});


/** Максимальная высота экрана, за вычетом всех инструментов браузера */
function setVariable() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVariable();
window.onresize = setVariable;
