import * as flsFunctions from "./modules/functions.js";
import Swiper from 'swiper';
import {
	Navigation,
	EffectFade,
	Pagination,
	Thumbs,
	Controller,
	FreeMode,
	Scrollbar,
	A11y,
	Autoplay,
	Mousewheel
} from 'swiper';
import AOS from 'aos';

import accordion from './modules/accordion.js';

import burger from './modules/burger.js';




flsFunctions.isWebp();

var swiper = new Swiper(".single-swiper", {
	spaceBetween: 30,
	modules: [Navigation, FreeMode, Autoplay],
	freeMode: true,
	grabCursor: true,
	loop: true, // добавьте эту опцию для бесконечного цикла прокрутки
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
	mousewheel: true,
	keyboard: true,
  });

var swiper = new Swiper(".news-slider", {
	spaceBetween: 30,
	modules: [Navigation, FreeMode, Autoplay],
	freeMode: true,
	grabCursor: true,
	loop: true, // добавьте эту опцию для бесконечного цикла прокрутки
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
	mousewheel: true,
	keyboard: true,
  });
  
  

  var swiper1 = new Swiper(".pay-slider", {
	spaceBetween: 30,
	modules: [Navigation, FreeMode, Autoplay],
	freeMode: true,
	grabCursor: true,
	loop: true, // добавьте эту опцию для бесконечного цикла прокрутки
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
	mousewheel: true,
	keyboard: true,
  });

  var swiper2 = new Swiper(".services-slider", {
	spaceBetween: 30,
	modules: [Navigation, FreeMode, Autoplay],
	freeMode: true,
	grabCursor: true,
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
	mousewheel: true,
	keyboard: true,
	loop: true, // добавьте эту опцию для бесконечного цикла прокрутки
  });

  var swiper8 = new Swiper(".block-slider", {
	spaceBetween: 30,
	modules: [Navigation, FreeMode, Autoplay],
	freeMode: true,
	grabCursor: true,
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
	mousewheel: true,
	keyboard: true,
	loop: true, // добавьте эту опцию для бесконечного цикла прокрутки
  });

  var swiper3 = new Swiper(".news-slider-mobile", {
	spaceBetween: 15,
	modules: [Navigation, Pagination],
	grabCursor: true,
	mousewheel: true,
	keyboard: true,
	pagination: {
	  el: ".swiper-pagination",
	  dynamicBullets: true,
	},
	slidesPerView: 1, // задаем количество слайдов, которое нужно показывать
	slidesPerGroup: 1, // задаем количество слайдов, которые нужно прокручивать за раз
  });

  var swiper4 = new Swiper(".pay-slider-mobile", {
	spaceBetween: 15,
	modules: [Navigation, Pagination],
	grabCursor: true,
	mousewheel: true,
	keyboard: true,
	pagination: {
	  el: ".swiper-pagination",
	  dynamicBullets: true,
	},
	slidesPerView: 1, // задаем количество слайдов, которое нужно показывать
	slidesPerGroup: 1, // задаем количество слайдов, которые нужно прокручивать за раз
  });

  var swiper4 = new Swiper(".media-slider-mobile", {
	spaceBetween: 15,
	modules: [Navigation, Pagination],
	grabCursor: true,
	mousewheel: true,
	keyboard: true,
	pagination: {
	  el: ".swiper-pagination",
	  dynamicBullets: true,
	},
	slidesPerView: 1, // задаем количество слайдов, которое нужно показывать
	slidesPerGroup: 1, // задаем количество слайдов, которые нужно прокручивать за раз
  });

  var swiper5 = new Swiper(".services-slider-mobile", {
	spaceBetween: 15,
	modules: [Navigation, Pagination],
	grabCursor: true,
	mousewheel: true,
	keyboard: true,
	pagination: {
	  el: ".swiper-pagination",
	  dynamicBullets: true,
	},
	slidesPerView: 1, // задаем количество слайдов, которое нужно показывать
	slidesPerGroup: 1, // задаем количество слайдов, которые нужно прокручивать за раз
  });

  jQuery(document).ready(function($) {
	// Скрыть подменю при загрузке страницы
	$('#menu-item-87 .sub-menu').hide();
	
	// Показать подменю при нажатии на главный пункт меню
	$('#menu-item-87.menu-item-has-children').click(function() {
	  $(this).children('.sub-menu').slideToggle('fast');
	});
  });

  

  

  AOS.init({
	// Global settings:
	disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
	startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
	initClassName: 'aos-init', // class applied after initialization
	animatedClassName: 'aos-animate', // class applied on animation
	useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
	disableMutationObserver: false, // disables automatic mutations' detections (advanced)
	debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
	throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
	// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
	offset: 120, // offset (in px) from the original trigger point
	delay: 0, // values from 0 to 3000, with step 50ms
	duration: 400, // values from 0 to 3000, with step 50ms
	easing: 'ease', // default easing for AOS animations
	once: false, // whether animation should happen only once - while scrolling down
	mirror: false, // whether elements should animate out while scrolling past them
	anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});