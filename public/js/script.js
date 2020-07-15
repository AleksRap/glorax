"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

document.addEventListener('DOMContentLoaded', function () {
  var screenWidth = document.documentElement.clientWidth;
  /** Мобильное меню */

  var btnMobile = document.querySelector('[data-mobile-nav="open"]');
  var btnCloseMobileMenu = document.querySelector('[data-mobile-nav="close"]');
  var btnModalMobile = document.querySelector('.nav__callback-btn_mobile');
  var mobileMenu = document.querySelector('.nav__mobile-list-wrap');
  btnMobile.addEventListener('click', function () {
    mobileMenu.classList.add('open');
  });
  btnCloseMobileMenu.addEventListener('click', function () {
    mobileMenu.classList.remove('open');
  });
  btnModalMobile.addEventListener('click', function () {
    mobileMenu.classList.remove('open');
  });
  mobileMenu.addEventListener('click', function (event) {
    var link = event.target.closest('.nav__mobile-link');
    if (!link) return;
    mobileMenu.classList.remove('open');
  });
  window.addEventListener('click', function (event) {
    var link = event.target.closest('.nav__mobile-list-wrap');
    var btnMobile = event.target.closest('[data-mobile-nav="open"]');
    if (link || btnMobile) return;
    mobileMenu.classList.remove('open');
  });
  /** Модалка */

  new Modal({
    idModal: 'modal-callback',
    selectorBtnOpen: '.callback-btn'
  });
  /** Открытие/закрытие карточек проектов на мобильных */

  if (screenWidth < 1000) {
    var cards = document.querySelector('.projects__cards');
    cards.addEventListener('click', function (event) {
      var btnCard = event.target.closest('[data-btn-card="toggle"]');
      if (!btnCard) return;
      btnCard.classList.toggle('open');
      btnCard.closest('.card-real-estate').classList.toggle('open');
    });
    cards.addEventListener('click', function (event) {
      var card = event.target.closest('.card-real-estate');
      var btnCard = event.target.closest('[data-btn-card="toggle"]');
      if (!card || btnCard) return;

      if (card.classList.contains('open')) {
        card.classList.remove('open');
        card.querySelector('[data-btn-card="toggle"]').classList.remove('open');
      }
    });
  }
  /** Прилипание меню после прокрутки */


  var header = document.querySelector('.header');
  var headerHeight = header.clientHeight;

  function transferNavbarSecond() {
    window.pageYOffset > headerHeight ? header.classList.add('header_color') : header.classList.remove('header_color');
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
      clickable: true
    },
    preloadImages: false,
    lazy: true,
    loadOnTransitionStart: true
  });
  /** Плавная прокрутка до якоря */

  var anchors = document.querySelectorAll('[href^="#"]');
  var speed = 0.3;

  if (anchors.length) {
    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var yOffset = window.pageYOffset;
        var hash = e.target.href.replace(/[^#]*(.*)/, '$1');
        var topPosition = document.querySelector(hash).getBoundingClientRect().top;
        var start = null;
        requestAnimationFrame(step);

        function step(time) {
          if (start === null) start = time;
          var progress = time - start;
          var directionScroll = topPosition < 0 ? Math.max(yOffset - progress / speed, yOffset + topPosition - headerHeight - 20) : Math.min(yOffset + progress / speed, yOffset + topPosition - headerHeight - 20);
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


  var input = document.querySelector('[data-input="tel"]');
  input.addEventListener("input", mask);
  input.addEventListener("focus", mask);
  input.addEventListener("blur", mask);
  /** Планировки */

  document.querySelectorAll('.card-tower').forEach(function (card) {
    return new Layouts(card);
  });
  /** Галереи в карточках ЖК */

  document.querySelectorAll('.card-tower__img').forEach(function (wrapImg) {
    return new GalleryCards(wrapImg);
  });
});
/** Управляем событиями */

var ManagementEvents = /*#__PURE__*/function () {
  function ManagementEvents() {
    _classCallCheck(this, ManagementEvents);
  }

  _createClass(ManagementEvents, null, [{
    key: "addEventToArr",

    /**
     * На входе принимаем объект с параметрами
     * arr   - массив куда сохраняем события
     * el    - элемент, на который навешиваем обработчик
     * event - событие (str)
     * fn    - анонимная функция без вызова
     * @param data
     */
    value: function addEventToArr(data) {
      /** Добавляем событие в массив */
      data.arr.push({
        el: data.el,
        event: data.event,
        fn: data.fn
      });
      /** Вешаем слушатель */

      data.el.addEventListener(data.event, data.fn);
      return true;
    }
    /**
     * На входе принимаем массив событий
     * @param arr
     */

  }, {
    key: "removeEvents",
    value: function removeEvents(arr) {
      /** Снимаем обработчики события */
      arr.forEach(function (item) {
        item.el.removeEventListener(item.event, item.fn);
      });
      /** Очищаем массив */

      arr.splice(0, arr.length);
      return true;
    }
  }]);

  return ManagementEvents;
}();
/** Модалка */


var Modal = /*#__PURE__*/function () {
  function Modal(data) {
    _classCallCheck(this, Modal);

    this.arrEvents = [];
    this._modal = document.getElementById(data.idModal);
    this._modalWindow = this._modal.querySelector('[data-modal="window"]');
    this._btnsOpen = document.querySelectorAll(data.selectorBtnOpen);
    this._btnClose = this._modal.querySelector('[data-modal="close"]');
    this.bind();
  }

  _createClass(Modal, [{
    key: "open",
    value: function open() {
      this._modal.classList.add('modal_open');

      this._modalWindow.classList.add('modal__window_open');
    }
  }, {
    key: "close",
    value: function close() {
      this._modal.classList.remove('modal_open');

      this._modalWindow.classList.remove('modal__window_open');
    }
  }, {
    key: "bind",
    value: function bind() {
      var _this = this;

      /**
       * Открытие модалки по клику на кнопку
       */
      this._btnsOpen.forEach(function (btn) {
        ManagementEvents.addEventToArr({
          arr: _this.arrEvents,
          el: btn,
          event: 'click',
          fn: function fn() {
            return _this.open();
          }
        });
      });
      /**
       * Закрытие модалки по клику вне нее
       */


      ManagementEvents.addEventToArr({
        arr: this.arrEvents,
        el: this._modal,
        event: 'click',
        fn: function fn(event) {
          return !event.target.closest('[data-modal=window]') && _this.close();
        }
      });
      /**
       * Закрытие модалки по клику на крестик
       */

      ManagementEvents.addEventToArr({
        arr: this.arrEvents,
        el: this._btnClose,
        event: 'click',
        fn: function fn() {
          return _this.close();
        }
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      ManagementEvents.removeEvents(this.arrEvents);

      this._modal.remove();
    }
  }]);

  return Modal;
}();
/** Маска на телефон */


function setCursorPosition(pos, elem) {
  elem.focus();

  if (elem.setSelectionRange) {
    elem.setSelectionRange(pos, pos);
  } else if (elem.createTextRange) {
    var range = elem.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
}

function mask(event) {
  var matrix = "+7 (___) ___ ____";
  var i = 0;
  var def = matrix.replace(/\D/g, '');
  var val = this.value.replace(/\D/g, '');
  if (def.length >= val.length) val = def;
  this.value = matrix.replace(/./g, function (str) {
    return /[_\d]/.test(str) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : str;
  });

  if (event.type === "blur") {
    if (this.value.length === 2) this.value = "";
  } else {
    setCursorPosition(this.value.length, this);
  }
}
/** Планировки */


var Layouts = /*#__PURE__*/function () {
  function Layouts(el) {
    _classCallCheck(this, Layouts);

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

  _createClass(Layouts, [{
    key: "showBlock",
    value: function showBlock(el) {
      this._body.removeAttribute('hidden');

      this._allBlock.forEach(function (block) {
        return block.setAttribute('hidden', true);
      });

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
  }, {
    key: "hideBlock",
    value: function hideBlock() {
      this._body.setAttribute('hidden', true);

      this._allBlock.forEach(function (block) {
        return block.removeAttribute('hidden');
      });

      this._btnAbout.classList.remove('card-tower__btn_active');

      this._btnLayouts.classList.remove('card-tower__btn_active');
    }
  }, {
    key: "changeLayout",
    value: function changeLayout(event) {
      var clickRow = event.target.closest('.card-tower__table-row');
      if (!clickRow) return;
      var index;

      _toConsumableArray(this._rowsWrap.children).forEach(function (el, i) {
        if (el === clickRow) index = i;
        el.classList.remove('active');
      });

      clickRow.classList.add('active');

      _toConsumableArray(this._images.children).forEach(function (el, i) {
        i === index ? el.removeAttribute('hidden') : el.setAttribute('hidden', true);
      });
    }
  }, {
    key: "_bind",
    value: function _bind() {
      var _this2 = this;

      this._btnAbout.addEventListener('click', function () {
        return _this2.showBlock(_this2._about);
      });

      this._btnLayouts.addEventListener('click', function () {
        return _this2.showBlock(_this2._layouts);
      });

      this._btnClose.addEventListener('click', function () {
        return _this2.hideBlock();
      });

      this._rowsWrap.addEventListener('mouseover', function (event) {
        return _this2.changeLayout(event);
      });
    }
  }]);

  return Layouts;
}();
/** Галерея внутри карточек жк */


var GalleryCards = /*#__PURE__*/function () {
  function GalleryCards(el) {
    _classCallCheck(this, GalleryCards);

    this._gallery = el;

    this._render();

    this._bind();
    /** Рефрешим либу галереи */


    refreshFsLightbox();
  }

  _createClass(GalleryCards, [{
    key: "_render",
    value: function _render() {
      this._gallery.insertAdjacentHTML('beforeend', this._generateTemplate());
    }
  }, {
    key: "_bind",
    value: function _bind() {
      var _this3 = this;

      var sections = this._gallery.querySelector('.card-tower__sections');

      sections.addEventListener('mouseover', function (event) {
        var section = event.target.closest('.card-tower__section');
        var index;

        _toConsumableArray(sections.children).forEach(function (child, i) {
          if (section === child) index = i;
          child.classList.remove('active');
        });

        _toConsumableArray(_this3._gallery.children).forEach(function (img) {
          return img.classList.remove('active');
        });

        section.classList.add('active');

        _toConsumableArray(_this3._gallery.children)[index].classList.add('active');
      });
    }
  }, {
    key: "_generateTemplate",
    value: function _generateTemplate() {
      var countImg = this._gallery.childElementCount;
      var links = [];

      _toConsumableArray(this._gallery.children).forEach(function (img) {
        return links.push(img.src.split(location.origin).join(''));
      });

      return "\n      <div class=\"card-tower__sections\">\n        ".concat(this._getTemplateSection(countImg, links), "\n      </div>\n    ");
    }
  }, {
    key: "_getTemplateSection",
    value: function _getTemplateSection(count, links) {
      var sectionTemplate = '';

      for (var i = 0; i < count; i++) {
        sectionTemplate += "<a class=\"card-tower__section\" href=\"".concat(links[i], "\" data-fslightbox=\"gallery\"></a>");
      }

      return sectionTemplate;
    }
  }]);

  return GalleryCards;
}();
/** Yandex api */


ymaps.ready(function () {
  var myMap = new ymaps.Map('map-yandex', {
    center: [59.93, 30.31],
    zoom: 11
  });
  var arrInfo = [{
    name: 'Ligovsky city - Второй квартал',
    coordinates: [59.906359, 30.344947],
    address: 'Санкт Петербург, Лиговский проспект, 232',
    img: 'images/real-estate/1.jpg'
  }, {
    name: 'Ligovsky city - Первый квартал',
    coordinates: [59.905321, 30.342359],
    address: 'Санкт Петербург, Лиговский проспект, 271',
    img: 'images/real-estate/2.jpg'
  }, {
    name: 'Golden City',
    coordinates: [59.941475, 30.193832],
    address: 'Санкт Петербург, ул. Челюскина, 4',
    img: 'images/real-estate/3.jpg'
  }, {
    name: 'Английская миля',
    coordinates: [59.847010, 30.113936],
    address: 'Санкт Петербург, Петергофское ш., 78',
    img: 'images/real-estate/4.jpg'
  }, {
    name: 'Grand House',
    coordinates: [59.925398, 30.373702],
    address: 'Санкт Петербург, Тележная ул., 17-19',
    img: 'images/real-estate/5.jpg'
  }, {
    name: 'Олимп',
    coordinates: [56.256213, 37.975039],
    address: 'МО, г. Хотьково, ул. Михеенко, 25',
    img: 'images/real-estate/6.jpg'
  }, {
    name: 'Мейн Хаус',
    coordinates: [60.028029, 30.416183],
    address: 'Санкт Петербург, Гражданский проспект, 107',
    img: 'images/real-estate/7.jpg'
  }, {
    name: 'Твин Хаус',
    coordinates: [59.873853, 30.367225],
    address: 'Санкт Петербург, Будапештская, 2',
    img: 'images/real-estate/8.jpg'
  }];

  var header = function header(img, address) {
    return "\n    <div class=\"card-map__header\">\n      <img src=\"".concat(img, "\" alt=\"").concat(address, "\">\n    </div>\n  ");
  };

  var footer = function footer(name, address) {
    return "\n    <div class=\"card-map__footer\">\n      <h2 class=\"card-map__title\">".concat(name, "</h2>\n      <p class=\"card-map__address\">").concat(address, "</p>\n    </div>\n  ");
  };

  arrInfo.forEach(function (_ref) {
    var name = _ref.name,
        coordinates = _ref.coordinates,
        address = _ref.address,
        img = _ref.img;
    myMap.geoObjects.add(new ymaps.Placemark(coordinates, {
      hintLayout: name,
      balloonContentHeader: header(img),
      balloonContentFooter: footer(name, address)
    }, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: 'images/other/point-map.png',
      iconImageSize: [34, 43],
      iconImageOffset: [-17, -43],
      iconContentOffset: [17, 50]
    }));
  });
});