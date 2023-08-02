<?php
/**
 * The Template for displaying all single products
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://docs.woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header( 'shop' ); ?>

<?php
// выводим хлебные крошки от Yoast SEO
if (function_exists('yoast_breadcrumb')) {
    yoast_breadcrumb('<p id="breadcrumbs">', '</p>');
}
?>

	<?php
		/**
		 * woocommerce_before_main_content hook.
		 *
		 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
		 * @hooked woocommerce_breadcrumb - 20
		 */
		do_action( 'woocommerce_before_main_content' );
	?>

		<?php while ( have_posts() ) : ?>
			<?php the_post(); ?>

			<?php wc_get_template_part( 'content', 'single-product' ); ?>

		<?php endwhile; // end of the loop. global $product;


?>

		<?php if ( ! $product->is_type( 'variable' ) ) : ?>
    <style>
        .quantity {
            display: none;
        }
    </style>
<?php endif; ?>

	<?php
		/**
		 * woocommerce_after_main_content hook.
		 *
		 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
		 */
		do_action( 'woocommerce_after_main_content' );

		
	?>
		

	<?php
		/**
		 * woocommerce_sidebar hook.
		 *
		 * @hooked woocommerce_get_sidebar - 10
		 */
		//do_action( 'woocommerce_sidebar' ); //Remove Pages, Archives, categories
		
	?>

<div class="design-cart-custom-quantity-new" id="design-cart-custom-quantity-new1">

<?php
$photo = get_field('single-photo');

if ($photo) {
    echo '<img src="' . $photo['url'] . '" alt="' . $photo['alt'] . '">';
}
$product_id = get_the_ID(); // ID текущего поста (товара)
$simple_product_id = get_post_meta($product_id, 'simple_product', true);

$min_quantity = get_post_meta($simple_product_id, '_min_quantity', true);
$max_quantity = get_post_meta($simple_product_id, '_max_quantity', true);
$step = get_post_meta($simple_product_id, '_step', true);



$product_name = get_the_title(); // Получаем полное название товара
$product_parts = explode(' ', $product_name); // Разделяем название на отдельные части

if (count($product_parts) > 1) {
    $product_name = array_pop($product_parts); // Извлекаем последнюю часть названия
}


if ($simple_product_id) {
    $simple_product = wc_get_product($simple_product_id);

    if ($simple_product && $simple_product->is_type('simple')) {
        // Выведите информацию о простом товаре, например, название и цену

        // Выведите форму выбора количества и кнопку "Добавить в корзину"
        echo '<div class="design-cart-custom-quantity" id="design-cart-custom-main">';
        echo '<form class="cart" id="cart-custom-quantity" method="post" enctype="multipart/form-data">';
        echo '<div class="quantity-custom-block">';
        echo '<div class="quantity-custom-block-first">';
        echo '<div class="quantity-cus">';
        echo '<label class="custom-signle-label1">' . $product_name . ':</label>';
        echo '<input type="text" step="' . ($step ? $step : 1) . '" min="' . ($min_quantity ? $min_quantity : 1) . '" name="quantity" id="quantity-input" value="1" title="' . esc_attr__('Qty', 'woocommerce') . '" class="input-text qty" size="4" pattern="[0-9]*" inputmode="numeric" />';
        echo '</div>';
        echo '<div class="custom-slider-container">';
        echo '<div class="custom-slider"></div>';
        //echo '<p id="total-price"></p>';
        echo '</div>';



        echo '<div class="custom-single-price-block">';
       // echo '<p class="quantity-custom-block-p">' . $simple_product->get_description() . '</p>';
       // echo '<p class="quantity-custom-block-p">' . $simple_product->get_price_html() . '</p>';
        echo '</div>';
        echo '</div>';
        echo '</div>';
        echo '<div class="custom-single-label-block">';
        echo '<label class="custom-signle-label1">Link to the page<span>*</span></label>';
        echo '<input type="text" id="quantity22" data-min-quantity="' . ($min_quantity ? $min_quantity : 1) . '" data-max-quantity="' . ($max_quantity ? $max_quantity : 100) . '" class="single-input-custom-fields" name="custom_link_to_page" placeholder="Link to the page" required>';
        echo '</div>';
        echo '<button type="submit" name="add-to-cart" value="' . esc_attr($simple_product->get_id()) . '" class="single_add_to_cart_button-custom button alt">' . esc_html__('Add to cart', 'woocommerce') . '</button>';
        echo '</form>';
        echo '</div>';
    }
}
?>

</div>
<script>
jQuery(function($) {
  var price = <?php echo $simple_product->get_price(); ?>;
  var minQuantity = <?php echo $min_quantity ? $min_quantity : 1; ?>;
  var maxQuantity = <?php echo $max_quantity ? $max_quantity : 100; ?>;
  var step = <?php echo $step ? $step : 1; ?>;

  var slider = $(".custom-slider");
  var arrow = $(".custom-slider-arrow");
  var text = $(".custom-slider-text");

  function updateTotalPrice() {
    var quantity = parseInt($("#quantity-input").val());
    if (!isNaN(quantity)) {
      var total = quantity * price;
      $("#total-price").text(total.toFixed(2) + "$");
    }
  }

  updateTotalPrice();

  $("#quantity-input").prop("step", step).on("input", updateTotalPrice);

  slider.slider({
    range: "min",
    value: 1,
    min: minQuantity,
    max: maxQuantity,
    step: step, // Установка шага для слайдера
    create: function(event, ui) {
      $('.custom-slider').find('.ui-slider-handle').append("<p id='total-price'></p>");
      updateTotalPrice();
    },
    slide: function(event, ui) {
      // Округление значения до ближайшего кратного шагу
      var newValue = Math.round(ui.value / step) * step;
      $("#quantity-input").val(newValue);
      updateTotalPrice();
      moveArrow(ui.value);
      moveText(ui.value);
    },
    touch: true // Включение поддержки перетаскивания на сенсорных устройствах
  });

  function moveArrow(value) {
    var sliderWidth = slider.width();
    var handle = slider.find(".ui-slider-handle");
    var handlePosition = handle.position().left;
    var handleWidth = handle.outerWidth();
    var arrowPosition = handlePosition + handleWidth / 2 - arrow.width() / 2;
    arrow.css("left", arrowPosition);
  }

  function moveText(value) {
    var handle = slider.find(".ui-slider-handle");
    var handlePosition = handle.position().top;
    var handleHeight = handle.outerHeight();
    var textHeight = $("#total-price").outerHeight();
    var textTop = handlePosition - handleHeight - textHeight;
  }
});



</script>








<div id="slider-custom-new-others-2">
    <div class="swiper custom-others-slider22">
        <div class="swiper-button-prev">
            <img src="<?php bloginfo('template_url'); ?>/src/img/left.svg" alt="left">
        </div>
        <div class="swiper-wrapper">
            <?php
            global $product;

            // Получение текущей категории основного товара
            $terms = get_the_terms($product->get_id(), 'product_cat');
            $current_category = $terms ? $terms[0]->slug : '';

            // Параметры запроса для получения вариативных товаров
            $variations_args = array(
                'type'  => 'variable',
                'limit' => -1,
            );

            $variations_products = wc_get_products($variations_args);
            $counter = 0;

            // Вывод вариативных товаров
            if (!empty($variations_products)) {
                // Вывод товаров из той же категории, что и основной товар
                foreach ($variations_products as $variation) {
                    $product = $variation;
                    $terms = get_the_terms($product->get_id(), 'product_cat');
                    $category_slugs = wp_list_pluck($terms, 'slug');

                    if (in_array($current_category, $category_slugs)) {
                        if ($counter % 3 === 0) {
                            if ($counter > 0) {
                                echo '</div>'; // Закрытие предыдущего swiper-slide
                            }
                            echo '<div class="swiper-slide custom-thers-slide-desktop">'; // Открытие нового swiper-slide
                        }
                        ?>
                        <div class="custom-others-block">
                            <?php
							$product_link = get_permalink($product->get_id());
                            // Вывод изображений из поля acf
                            $photo = get_field('single-photo', $product->get_id());
                            if ($photo) {
								echo '<a href="' . $product_link . '">';
                                echo '<img src="' . $photo['url'] . '" alt="' . $photo['alt'] . '">';
								echo '</a>';
                            }

                            // Вывод информации о вариативном товаре
                            echo '<a href="' . $product_link . '">';
                            echo '<h4>' . $product->get_name() . '</h4>';
							echo '</a>';

                            echo '<div class="product-description-catalog">' . get_the_content() . '</div>';


                            // Вывод вариаций
                            $variations = $product->get_available_variations();

                            /*if (!empty($variations)) {
                                echo '<p>Choose the package</p>';
                                echo '<select class="variation-select custom-select1-others-' . $product->get_id() . '" data-product-id="' . $product->get_id() . '">';
                                foreach ($variations as $variation) {
                                    $variation_id = $variation['variation_id'];
                                    $attributes = implode(', ', $variation['attributes']);
                                    $price = $variation['display_price'];

                                    // Оберните имя вариации и цену внутри дополнительного элемента span
                                    echo '<option value="' . $variation_id . '" data-price="' . $price . '">';
                                    echo '<span class="variation-name">' . $attributes . '</span>'; // Имя вариации
                                    echo '<span>&nbsp;</span>';
                                    echo '<span>&nbsp;</span>';
                                    echo '<span>—</span>';
                                    echo '<span>&nbsp;</span>';
                                    echo '<span>&nbsp;</span>';
                                    echo '<p style="margin-left:130px !important; ">' . wc_price($price)  .  '</p>'; // Цена
                                    echo '</option>';
                                }
                                echo '</select>';
                            }

                            echo '<div class="custom-others-input">';
                            echo '<p>Link to the page</p>';
                            echo '<input name="custom_link_to_page" placeholder="Link to the page">';
                            echo '</div>';*/

                            //echo '<button name="add-to-cart" class="add-to-cart-button single_add_to_cart_button" data-product-id="' . $product->get_id() . '">Add to cart</button>';
                            echo '<a href="' . esc_url($product->get_permalink()) . '" class="custom-others-block-button-perma">' . __('Buy now', 'text-domain') . '</a>';

                            ?>
                        </div>
                        <?php
                        $counter++;
                    }
                }

                // Вывод остальных товаров
                foreach ($variations_products as $variation) {
                    $product = $variation;
                    $terms = get_the_terms($product->get_id(), 'product_cat');
                    $category_slugs = wp_list_pluck($terms, 'slug');

                    if (!in_array($current_category, $category_slugs)) {
                        if ($counter % 3 === 0) {
                            if ($counter > 0) {
                                echo '</div>'; // Закрытие предыдущего swiper-slide
                            }
                            echo '<div class="swiper-slide custom-thers-slide-desktop">'; // Открытие нового swiper-slide
                        }
                        ?>
                        <div class="custom-others-block">
                            <?php
                            // Вывод изображений из поля acf
                            $photo = get_field('single-photo', $product->get_id());
                            if ($photo) {
                                echo '<img src="' . $photo['url'] . '" alt="' . $photo['alt'] . '">';
                            }

                            // Вывод информации о вариативном товаре
                            echo '<h4>' . $product->get_name() . '</h4>';
                            echo '<div class="product-description-catalog">' . get_the_content() . '</div>';


                            // Вывод вариаций
                            $variations = $product->get_available_variations();

                            /*if (!empty($variations)) {
                                echo '<p>Choose the package</p>';
                                echo '<select class="variation-select custom-select1-others-' . $product->get_id() . '" data-product-id="' . $product->get_id() . '">';
                                foreach ($variations as $variation) {
                                    $variation_id = $variation['variation_id'];
                                    $attributes = implode(', ', $variation['attributes']);
                                    $price = $variation['display_price'];

                                    // Оберните имя вариации и цену внутри дополнительного элемента span
                                    echo '<option value="' . $variation_id . '" data-price="' . $price . '">';
                                    echo '<span class="variation-name">' . $attributes . '</span>'; // Имя вариации
                                    echo '<span>&nbsp;</span>';
                                    echo '<span>&nbsp;</span>';
                                    echo '<span>—</span>';
                                    echo '<span>&nbsp;</span>';
                                    echo '<span>&nbsp;</span>';
                                    echo '<p style="margin-left:130px !important; ">' . wc_price($price)  .  '</p>'; // Цена
                                    echo '</option>';
                                }
                                echo '</select>';
                            }

                            echo '<div class="custom-others-input">';
                            echo '<p>Link to the page</p>';
                            echo '<input name="custom_link_to_page" placeholder="Link to the page">';
                            echo '</div>';

                            echo '<button name="add-to-cart" class="add-to-cart-button single_add_to_cart_button" data-product-id="' . $product->get_id() . '">Add to cart</button>';
                            */

                            echo '<a href="' . esc_url($product->get_permalink()) . '" class="custom-others-block-button-perma">' . __('Buy now', 'text-domain') . '</a>';

                            ?>
                        </div>
                        <?php
                        $counter++;
                    }
                }

                if ($counter > 0) {
                    echo '</div>'; // Закрытие последнего swiper-slide
                }
            }
            ?>
        </div>
        <div class="swiper-button-next">
            <img src="<?php bloginfo('template_url'); ?>/src/img/right.svg" alt="right">
        </div>
    </div>
</div>










<div class="swiper-container slider-mobile-others" id="slider-mobile-others2">
	
  <div class="swiper-wrapper">
    <?php
    global $product;

    // Получение текущей категории основного товара
    $terms = get_the_terms($product->get_id(), 'product_cat');
    if ($terms && !is_wp_error($terms)) {
        $category_slugs = wp_list_pluck($terms, 'slug');
    } else {
        $category_slugs = array();
    }

    // Параметры запроса для получения товаров
    $args = array(
        'post_type'      => 'product',
        'posts_per_page' => 11, // Количество товаров в слайдере
        'post__not_in'   => array($product->get_id()), // Исключаем основной товар
        'tax_query'      => array(
            array(
                'taxonomy' => 'product_cat',
                'field'    => 'slug',
                'terms'    => $category_slugs, // Фильтруем по категории
            ),
        ),
    );

    $related_products = new WP_Query($args);

    // Вывод связанных товаров
    if ($related_products->have_posts()) {
        while ($related_products->have_posts()) {
            $related_products->the_post();
            global $product;
            ?>
            <div class="swiper-slide">
                <div class="custom-others-block">
                    <!-- Вывод изображений из поля acf -->
                    <?php
					$product_link = get_permalink($product->get_id());
                    $photo = get_field('single-photo');

                    if ($photo) {
						echo '<a href="' . $product_link . '">';
                        echo '<img src="' . $photo['url'] . '" alt="' . $photo['alt'] . '">';
						echo '</a>';
                    }
                    ?>
					
					<?php
					echo '<a href="' . $product_link . '">';
					?>
                    <!-- Вывод информации о связанном товаре -->
                    <h4><?php the_title(); ?></h4>
					<?php
					echo '</a>';
					?>

                    <!-- Вывод вариаций -->
                    <?php
                   /* if ($product->get_type() === 'variable') {
                        $variations = $product->get_available_variations();

                        if (!empty($variations)) {
                            echo '<p>Choose the package</p>';
								echo '<select class="variation-select1 custom-select1-others-' . $product->get_id() . '" data-product-id="' . $product->get_id() . '">';
                            foreach ($variations as $variation) {
                                $variation_id = $variation['variation_id'];
                                $attributes = implode(', ', $variation['attributes']);
                                $price = $variation['display_price'];

                                // Оберните имя вариации и цену внутри дополнительного элемента span
                                echo '<option value="' . $variation_id . '" data-price="' . $price . '">';
                                echo '<span class="variation-name">' . $attributes . '</span>'; // Имя вариации
                                echo '<span>&nbsp;</span>';
                                echo '<span>&nbsp;</span>';
                                echo '<span>—</span>';
                                echo '<span>&nbsp;</span>';
                                echo '<span>&nbsp;</span>';
                                echo '<p  style="margin-left:130px !important; ">' . wc_price($price) . '</p>'; // Цена
                                echo '</option>';
                            }
                            echo '</select>';
                        }
                    } */
                    ?>

                    <!--<div class="custom-others-input">
                        <p>Link to the page</p>
                        <input name="custom_link_to_page" placeholder="Lint to the page">
                    </div>-->

                    <a href="<?php echo $product_link; ?>"><button data-product-id="<?php //echo $product->get_id(); ?>">Add to cart</button></a>
                </div>
            </div>
            <?php
        }

        wp_reset_postdata();
    }
    ?>
  </div>

  <!-- Пагинация -->
  <div class="swiper-pagination"></div>
</div>







	

<script>
	
	
	
	
	
 jQuery(document).ready(function($) {
	 
	 
	 		
	 		$('.variation-select1').on('change', function() {
    var variationId = $(this).val();
    var variationPrice = $(this).find(':selected').data('price');
    updateProductPrice(variationPrice);
});
	 		
	 $('.add-to-cart-button1').on('click', function(e) {
        e.preventDefault();
        var productId = $(this).data('product-id');
    	var variationId = $(this).closest('.custom-others-block').find('.variation-select1').val();

        // Проверяем, выбрана ли вариация
        if (!variationId) {
            alert('Пожалуйста, выберите вариацию товара.');
            return;
        }

        // AJAX-запрос на добавление товара в корзину
        $.ajax({
            type: 'POST',
            url: wc_add_to_cart_params.ajax_url,
            data: {
                action: 'add_to_cart',
                product_id: productId,
                variation_id: variationId,
            },
            success: function(response) {
                // Обработка успешного добавления товара в корзину
                if (response.success) {
                    location.reload(); // Обновление страницы
                } else {
                    location.reload(); // Обновление страницы
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                location.reload(); // Обновление страницы
            }
        });
    });
	 
            // Инициализация Select2 внутри слайдера
           
            var swiper100 = new Swiper(".custom-others-slider22", {
	
    slidesPerView: 1,
    slidesPerGroup: 1,
    simulateTouch: false,
	navigation: {
	  nextEl: ".swiper-button-next",
	  prevEl: ".swiper-button-prev",
	},
  });
           
	 

            var swiper99 = new Swiper(".slider-mobile-others", {
                spaceBetween: 15,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: ".swiper-pagination",
                    dynamicBullets: true,
                },
                slidesPerView: 1,
                slidesPerGroup: 1,
            });
	 
});









jQuery(document).ready(function($) {
	
	(function ($) {
$( document ).on( 'click', '.add-to-cart-button', function(e) {
e.preventDefault();
});
})(jQuery);
	
    // Обработчик изменения выбранной вариации
    $('.variation-select').on('change', function() {
    var variationId = $(this).val();
    var variationPrice = $(this).find(':selected').data('price');
    updateProductPrice(variationPrice);
});

    // Обновление цены товара
    function updateProductPrice(price) {
        $('.product-price').html(price);
    }

    // Обработчик клика на кнопку "Добавить в корзину"
   $(document).on('click', '.add-to-cart-button', function(e) {
    e.preventDefault();
    var button = $(this);
    var productId = button.data('product-id');
    var variationId = button.closest('.custom-others-block').find('.variation-select').val();
    var customLink = button.closest('.custom-others-block').find('input[name="custom_link_to_page"]').val();

    // Проверяем, выбрана ли вариация
    if (!variationId) {
        alert('Пожалуйста, выберите вариацию товара.');
        return;
    }

    // AJAX-запрос на добавление товара в корзину с дополнительными данными
    $.ajax({
        type: 'POST',
        url: wc_add_to_cart_params.ajax_url,
        data: {
            action: 'add_to_cart',
            product_id: productId,
            variation_id: variationId,
            custom_link_to_page: customLink
        },
        success: function(response) {
            // Обработка успешного добавления товара в корзину
            if (response.success) {
                // Вызываем функцию плагина "WooCommerce Added to Cart Popup (Ajax)" для обновления попапа
                $(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash, button]);

                // Опционально: Можно добавить дополнительную логику после успешного добавления товара в корзину
                // ...

                location.reload(); // Обновление страницы
            } else {
                // Опционально: Можно добавить обработку ошибки добавления товара в корзину
                // ...

                location.reload(); // Обновление страницы
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            // Обработка ошибки AJAX-запроса
            // ...

            location.reload(); // Обновление страницы
        }
    });
});
    // Выполнение кода при загрузке страницы
    $('.variation-select').each(function() {
        var options = $(this).data('select2-options');
        $(this).select2(options);

        // Добавляем правила CSS для стилизации выпадающего списка
        var style = $('<style>.select2-container--open .select2-results__option { }</style>');
		style.append('.select2-container--default .select2-results__option--selected { background-color: #fff; } ');
        style.append('.select2-container--default .select2-results__option--highlighted[aria-selected]:after { display: none; } ');
        style.append('.select2-container--default .select2-results__option[aria-selected=true], .select2-container--default .select2-results__option[data-selected=true] { background-color: #fff !important; } ');
        style.append('.select2-container--default .select2-selection--single .select2-selection__arrow { display: block !important; background-image: url("../img/new1/icon-arrow.svg"); } ');
        style.append('.select2-container--default .select2-results__option--highlighted[aria-selected] { background: none !important; color: #454545 !important; content: "" !important; }');
        style.append('.select2-container--default .select2-search--dropdown .select2-search__field { display: none; }');
        style.append('.select2-results__option { border-top-left-radius: 20px !important; border-top-right-radius: 20px !important; } ');
        style.append('.select2-container--open .select2-dropdown--below { border: 1px solid #D0D5DD; width: 350px !important; border-radius: 20px !important;}');
        style.append('.select2-container--open .select2-dropdown--above { border: 1px solid #D0D5DD; width: 350px !important; border-radius: 20px !important; }');
        style.append('.select2-container .select2-selection--single { font-size: 14px; width: 350px !important; line-height: 12px; font-weight: 500; color: #484848 !important; border: 1px solid #D0D5DD !important; height: 48px !important; border-radius: 20px !important; }'); // Устанавливаем ширину 280px
        $('body').append(style);
    });
});
	
	
	
	

</script>

		




    <div class="main-custom-block-image">
		<div class="my-custom-block-image">
            <img class="custom-block-image1" src="<?php the_field('block-photo'); ?>" />
  			<p class="custom-block-text1"><?= get_field("block-text"); ?></p>
		</div>
    </div>
		

<?php
get_footer( 'shop' );

/* Omit closing PHP tag at the end of PHP files to avoid "headers already sent" issues. */



