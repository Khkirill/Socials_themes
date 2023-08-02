<?php
/**
 * Empty cart page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/cart-empty.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 7.0.1
 */

defined( 'ABSPATH' ) || exit;

/*
 * @hooked wc_empty_cart_message - 10
 */

if ( wc_get_page_id( 'shop' ) > 0 ) : ?>
	<div class="cart">
        <div class="container">

            <h1>Cart</h1>

            <div class="cart__main">

                <div class="cart__first-block">

                    <h3>Your cart is empty</h3>

                    <p>Go to our services and choose what service you would like to receive</p>

                    <button class="cart__button">Our services</button>

                </div>

                <img src="<?php bloginfo('template_url'); ?>/src/img/cart/illustration-cart.svg" alt="" class="cart__image">

            </div>
        </div>
    </div>
<?php endif; ?>
