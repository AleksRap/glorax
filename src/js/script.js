document.addEventListener('DOMContentLoaded', () => {
  // const screenWidth = document.documentElement.clientWidth;
  //
  // /**
  //  * 100vh - высота без учета панелей инструментов на мобильных
  //  */
  // const vh = window.innerHeight * 0.01;
  // document.documentElement.style.setProperty('--vh', `${vh}px`);
  //
  // const header = document.querySelector('.header').clientHeight;
  // document.documentElement.style.setProperty('--header', `${header}px`);
  //
  //
  // /**
  //  * Обложки статей в соотношении 3.6
  //  */
  // const coversArticles = document.querySelectorAll('.article__pic');
  // if (coversArticles.length) coversArticles.forEach(cover => cover.style.height = `${cover.clientWidth / 3.6}px`);
  //
  // /**
  //  * Обложки статей в соотношении 3.6
  //  */
  // const coversCardsArt = document.querySelectorAll('.article-card__img');
  // if (coversCardsArt.length) coversCardsArt.forEach(cover => cover.style.height = `${cover.clientWidth / 3.6}px`);
  //
  // /**
  //  * Соотношение сторон баннера акций 6:1 (ПК), 330:200 (мобилки, ниже 480px)
  //  */
  // const bannersStock = document.querySelectorAll('.banner-stock');
  // screenWidth <= 480
  //   ? bannersStock.forEach(banner => banner.style.height = `${banner.clientWidth / 1.65}px`)
  //   : bannersStock.forEach(banner => banner.style.height = `${banner.clientWidth / 6}px`);
  //
  //
  // /**
  //  * Если видно мобильное меню
  //  */
  // if (screenWidth < 1200) {
  //
  //   /**
  //    * Открытие мобильного меню
  //    */
  //   const burger = document.querySelector('.burger');
  //   burger.addEventListener('click', function (event) {
  //     this.classList.toggle('open');
  //     this
  //       .closest('.navigation')
  //       .querySelector('.navigation__content')
  //       .classList.toggle('open');
  //   });
  //
  //   /**
  //    * Переключение открытой навигации
  //    */
  //   const navigation = document.querySelector('.navigation');
  //   const arrDropdownItem = navigation.querySelectorAll('.navigation__item');
  //
  //   navigation.addEventListener('click', event => {
  //     /**
  //      * Если клик был не по пункту с дропдауном, то выходим
  //      */
  //       const target = event.target.closest('.navigation__item_drop');
  //       if (!target) return;
  //
  //     /**
  //      * Если клик был по ссылке внутри дропдауна, то выходим
  //      */
  //     const subItem = event.target.closest('.navigation__link');
  //     if (!subItem) return;
  //
  //     event.preventDefault();
  //
  //     const itemOpen = target.classList.contains('open');
  //
  //     /**
  //      * Закрываем все пункты
  //      */
  //     arrDropdownItem.forEach(item => item.closest('.open') && item.classList.remove('open'));
  //
  //     /**
  //      * Открываем нужный
  //      */
  //     !itemOpen && target.classList.add('open');
  //   })
  // }
  //
  //
  // /** Прилипание меню после прокрутки */
  // const firstMenu = document.querySelector('.navbar-first');
  // const secondMenu = document.querySelector('.navbar-second');
  // const secondMenuMb = +getComputedStyle(secondMenu).marginBottom.split('px').join('');
  // const scrollHeight = firstMenu.clientHeight;
  // const mb = secondMenu.clientHeight + secondMenuMb;
  //
  // function transferNavbarSecond() {
  //   window.pageYOffset > scrollHeight
  //     ? secondMenu.classList.add('navbar-second_glue')
  //     : secondMenu.classList.remove('navbar-second_glue');
  //
  //   window.pageYOffset > scrollHeight
  //     ? firstMenu.style.marginBottom = `${mb}px`
  //     : firstMenu.style.marginBottom = '0px';
  // }
  //
  // transferNavbarSecond();
  // window.addEventListener('scroll', transferNavbarSecond);
  //
  //
  // /** Инициализация слайдеров swiper */
  // const swiperMain = new Swiper('.swiper-main', {
  //   slidesPerView: 'auto',
  //   initialSlide: 0,
  //   centeredSlides: true,
  //   spaceBetween: 30,
  //   loop: true,
  //   autoplay: true,
  //   delay: 4000,
  //   pagination: {
  //     el: '.swiper-pagination',
  //     clickable: true,
  //   },
  //   navigation: {
  //     prevEl: '.swiper-main__prev',
  //     nextEl: '.swiper-main__next'
  //   },
  //   slideToClickedSlide: true,
  //   preloadImages: false,
  //   lazy: true,
  //   loadOnTransitionStart: true
  // });
  //
  // const swiperSpecialist = new Swiper('.swiper-specialist', {
  //   initialSlide: 0,
  //   spaceBetween: 30,
  //   centeredSlides: false,
  //   allowTouchMove: false,
  //   navigation: {
  //     nextEl: '.specialists__next',
  //     prevEl: '.specialists__prev',
  //   },
  //   breakpoints: {
  //     480: {
  //       spaceBetween: 10,
  //       slidesPerView: 2
  //     },
  //     768: {
  //       spaceBetween: 20,
  //       slidesPerView: 3
  //     },
  //     992: {
  //       slidesPerView: 4
  //     },
  //     1200: {
  //       slidesPerView: 5
  //     },
  //     1500: {
  //       slidesPerView: 6
  //     }
  //   }
  // });
  //
  // const swipersComments = new Swiper('.swiper-comments', {
  //   initialSlide: 0,
  //   centeredSlides: true,
  //   loop: true,
  //   autoplay: false,
  //   navigation: {
  //     nextEl: '.comments__next',
  //     prevEl: '.comments__prev',
  //   },
  // });
  //
  // const swipersComments2 = new Swiper('.swiper-comments-2', {
  //   initialSlide: 0,
  //   centeredSlides: true,
  //   loop: true,
  //   autoplay: false,
  //   navigation: {
  //     nextEl: '.comments__next',
  //     prevEl: '.comments__prev',
  //   },
  // });
  //
  //
  // /**
  //  * После инициализации всех слайдеров с комментами скрываем их
  //  * видны будут только те у которых есть класс .active
  //  */
  // const commentsWrap = document.querySelectorAll('.comments__swiper');
  // commentsWrap.forEach(el => el.style.display = 'none');
  //
  //
  // /** Табы внутри блока отзывов */
  // const clinicWrap = document.querySelector('[data-wrap="clinic"]');
  // const specialistWrap = document.querySelector('[data-wrap="specialist"]');
  // const btnClinic = document.querySelector('[data-btn="clinic"]');
  // const btnSpecialist = document.querySelector('[data-btn="specialist"]');
  //
  // function toggleFeedback() {
  //   btnClinic.classList.toggle('active');
  //   btnSpecialist.classList.toggle('active');
  //   clinicWrap.classList.toggle('active');
  //   specialistWrap.classList.toggle('active');
  // }
  //
  // btnClinic && btnClinic.addEventListener('click', toggleFeedback);
  // btnSpecialist && btnSpecialist.addEventListener('click', toggleFeedback);
  //
  //
  // /**
  //  * Ленивая загрузка видео
  //  * событие скролла удаляется по достижению 50% прокрутки до видео
  //  */
  // const videoWrap = document.querySelector('.video');
  //
  // if (videoWrap) {
  //   const video = videoWrap.querySelector('video');
  //   const videoScrollTop = Math.ceil(video.getBoundingClientRect().top);
  //
  //   window.addEventListener('scroll', loadVideo);
  //
  //   function loadVideo() {
  //     const scrollTop = window.pageYOffset;
  //
  //     if (scrollTop > videoScrollTop / 2) {
  //       window.removeEventListener('scroll', loadVideo);
  //
  //       const source = video.querySelector('source');
  //       const urlVideo = source.dataset.src;
  //       source.setAttribute('src', urlVideo);
  //       video.load();
  //
  //       /** Вешаем обработчик на воспроизведение/остановку видео */
  //       videoWrap.addEventListener('click', async event => {
  //
  //         if (video.paused) {
  //           await video.play();
  //           videoWrap.style.background = 'url(../images/other/pattern.png) center repeat';
  //           video.controls = true;
  //         } else {
  //           video.pause();
  //           video.controls = false;
  //         }
  //
  //         event.target.closest('.video').classList.toggle('play');
  //       });
  //     }
  //   }
  // }
  //
  //
  // /** Календарь в модалке */
  // $('#datepicker').datepicker({
  //   minDate: new Date(),
  //   onSelect: function (dateText) {
  //     $('#appointment-date').val(dateText);
  //   }
  // });
  //
  //
  // /** Инициализация модалок */
  // const modalCallFeedback = new Modal({
  //   idModal: 'modal-call-feedback',
  //   selectorBtnOpen: '[data-btn="modal-call-feedback-btn"]'
  // });
  //
  // const modalDoctorCall = new Modal({
  //   idModal: 'modal-doctor-call',
  //   selectorBtnOpen: '[data-btn="modal-doctor-call-btn"]'
  // });
  //
  // const modalAppointment = new Modal({
  //   idModal: 'modal-appointment',
  //   selectorBtnOpen: '[data-btn="modal-appointment-btn"]'
  // });
  //
  // const modalFeedback = new Modal({
  //   idModal: 'modal-feedback',
  //   selectorBtnOpen: '[data-btn="modal-feedback-btn"]'
  // });
  //
  // const modalThanksFeedback = new Modal({
  //   idModal: 'modal-thanks-feedback',
  //   selectorBtnOpen: '[data-btn="modal-thanks-feedback-btn"]'
  // });
  //
  // const modalThanksAppointment = new Modal({
  //   idModal: 'modal-thanks-appointment',
  //   selectorBtnOpen: '[data-btn="modal-thanks-appointment-btn"]'
  // });
  //
  //
  // /** Проверка согласия на обработку персональных данных */
  // function checkAgree() {
  //   const btn = this.closest('form').querySelector('.button');
  //   btn.toggleAttribute('disabled');
  // }
  // document.getElementById('call-feedback-checkbox').addEventListener('change', checkAgree);
  // document.getElementById('doctor-call-checkbox').addEventListener('change', checkAgree);
  // document.getElementById('appointment-checkbox').addEventListener('change', checkAgree);


  /** Плавная прокрутка до якоря */
  const anchors = document.querySelectorAll('[href^="#"]');
  const speed = 0.5;

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


  // /** Маска номера телефона на поля. Maskedinput */
  // $("#call-feedback-tel").mask("+7 (999) 999-9999");
  // $("#call-doctor-call-tel").mask("+7 (999) 999-9999");
  // $("#call-appointment-tel").mask("+7 (999) 999-9999");
  //
  //
  // /** Инициализация галереи fancybox */
  // document.querySelector('[data-fancybox="gallery"]') && $('[data-fancybox="gallery"]').fancybox({
  //   toolbar: false,
  //   transitionEffect: "zoom-in-out",
  //   loop: true
  // });
  //
  //
  // /** Спойлеры услуг */
  // const spoilerWrap = document.querySelector('.amenities__spoilers');
  // if (spoilerWrap) {
  //   const spoilers = document.querySelectorAll('.spoiler');
  //   spoilers.forEach(spoiler => {
  //     new Spoiler({
  //       spoiler,
  //       wrap: spoilerWrap
  //     })
  //   });
  // }
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

class Spoiler {
  constructor(data) {
    this.spoiler = data.spoiler;
    this.body = this.spoiler.querySelector('.spoiler__body');
    this.wrap = data.wrap;
    this.spoilers = null;
    this.height = null;

    this._initialize();
  }

  open() {
    this.spoiler.classList.add('open');
    this.body.style.height = `${this.height}px`;
  }

  close() {
    this.spoiler.classList.remove('open');
    this.body.style.height = '0px';
  }

  closeAll() {
    this.spoilers.forEach(spoiler => {
      spoiler.classList.remove('open');
      spoiler.querySelector('.spoiler__body').style.height = '0px';
    });
  }

  _initialize() {
    this.height = this.body.clientHeight;
    this.body.style.height = '0px';

    /** если есть this.wrap, значит включен режим аккордеона */
    if (this.wrap) this.spoilers = this.wrap.querySelectorAll('.spoiler');

    this.spoiler.addEventListener('click', event => {
      const spoiler = event.target.closest('.spoiler');
      if (!spoiler) return;

      /** открываем или закрываем спойлер */
      const open = spoiler.classList.contains('open');
      if (open) {
        this.close();
      } else {
        this.wrap && this.closeAll();
        this.open();
      }
    });
  }
}