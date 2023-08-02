<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?php wp_title(''); ?></title>
	

    <?php wp_head(); ?>

	
	<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-BERYE2CK1T"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-BERYE2CK1T');
</script>
</head>

<body>

<header class="header">
	<div class="container">
		<div class="header__main">
			<div class="header__image">
				<img src="<?php bloginfo('template_url'); ?>/src/img/logo.svg" alt="logo" class="header__image-logo">
				<h1 class="header__socials"><a class="header__socials" href="<?php echo home_url(); ?>">Boost My Socials</a></h1>
			</div>

				

			<nav class="header__inner">
				<div class="header__links">
					<?php wp_nav_menu( array(
    					'theme_location' => 'header-menu',
    					'container'      => false,
    					'menu_class'     => 'header__links',
    					'fallback_cb'    => false,
    					'depth'          => 2, // Указываем максимальную глубину вложенности меню
					) ); ?>
						
					<a href="https://boostmysocials.ae/cart" id="cart-link">
						<div class="cart-icon" id="cart-icon">
						<?php
						$cart_items = WC()->cart->get_cart();
						$item_count = count($cart_items); // Общее количество элементов в корзине
						$unique_item_count = count(array_unique(array_column($cart_items, 'product_id'))); // Количество уникальных товаров

						echo $unique_item_count;
						?>
							<img src="<?php bloginfo('template_url'); ?>/src/img/single-product/icon-bag.svg" alt="" class="fas fa-shopping-cart">
						</div>
					</a>
					


					

					
				</div>

			</nav>

			<button class="header__burger"><img src="<?php bloginfo('template_url'); ?>/src/img/menu.svg" alt="open"></button>
			<button class="header__burger--close">
				<div class="header__image">
					<img src="<?php bloginfo('template_url'); ?>/src/img/logo.svg" alt="logo" class="header__image-logo">
					<h1 class="header__socials"><a class="header__socials" href="<?php echo home_url(); ?>">Boost My Socials</a></h1>
				</div>
				<img src="<?php bloginfo('template_url'); ?>/src/img/logo-mobile-close.svg">
			</button>

		</div>
		<a class="cart-icon-mobile-a" href="https://boostmysocials.ae/cart/">
		<div class="cart-icon-mobile" id="cart-icon">
    					<?php echo sprintf(_n('%d', '%d', WC()->cart->cart_contents_count, 'woocomerce'), WC()->cart->cart_contents_count); ?>
    					<img src="<?php bloginfo('template_url'); ?>/src/img/new1/icon-bag.svg" alt="" class="fas fa-shopping-cart">
		</div>
		</a>
	</div>
</header>



<script>
	document.addEventListener('DOMContentLoaded', function() {
        var cartLink = document.getElementById('cart-link');

        // Проверяем, пуста ли корзина при загрузке страницы
        if (<?php echo WC()->cart->cart_contents_count; ?> === 0) {
            cartLink.addEventListener('click', preventCartLinkClick);
        }

        function preventCartLinkClick(event) {
            event.preventDefault();
        }
    });
	
	
document.getElementById("cart-icon").addEventListener("click", function() {
    document.querySelector(".cart-items").classList.toggle("show");
});
	
	// Получаем элементы меню и кнопку бургер меню
var burgerButton = document.querySelector('.header__burger');
var closeBurgerButton = document.querySelector('.header__burger--close');
var headerMenu = document.querySelector('.header__links');

// Обработчик события клика на кнопку бургер меню
burgerButton.addEventListener('click', function() {
  // Добавляем класс menu-open к body
  document.body.classList.add('menu-open');
});

// Обработчик события клика на кнопку закрытия бургер меню
closeBurgerButton.addEventListener('click', function() {
  // Удаляем класс menu-open с body
  document.body.classList.remove('menu-open');
});

// Закрываем бургер меню при клике вне его области
document.addEventListener('click', function(event) {
  if (!headerMenu.contains(event.target) && !burgerButton.contains(event.target)) {
    document.body.classList.remove('menu-open');
  }
});
</script>
