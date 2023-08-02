const burgerTrigger = document.querySelector('.header__burger'),
	burgerClose = document.querySelector('.header__burger--close'),
	burgerItem = document.querySelector('.header__inner'),
	body = document.querySelector('body'),
	headerLink = document.querySelectorAll('.header__link');

burgerTrigger.addEventListener('click', (e) => {
	toggleBurger();
});

burgerClose.addEventListener('click', (e) => {
	toggleBurger();
});

if (window.innerWidth <= 700) {
	headerLink.forEach(item => {
		item.addEventListener('click', (e) => {
			toggleBurger();
		})
	})
}

function toggleBurger() {
	burgerItem.classList.toggle('active');
	body.classList.toggle('active');
	burgerTrigger.classList.toggle('active');
	burgerClose.classList.toggle('active');
}