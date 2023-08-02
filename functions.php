<?php 

add_action( 'wp_enqueue_scripts', 'followers_scripts' );

function followers_scripts() {
    wp_enqueue_style('style-min', get_template_directory_uri() . '/dist/css/style.min.css' );
    wp_enqueue_style('jquery-ui', 'https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css');
	wp_enqueue_style('style-selectize', 'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.15.2/css/selectize.default.min.css');
	wp_enqueue_style('style-select2', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css');
    wp_enqueue_style('style-fontapi', 'https://fonts.googleapis.com' );
    wp_enqueue_style('style-fontstatic', 'https://fonts.gstatic.com' );
    wp_enqueue_style('style-inter', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' );



	wp_enqueue_script( 'jquery', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js' );
    wp_enqueue_script('jquery-ui-js', 'https://code.jquery.com/ui/1.12.1/jquery-ui.js');
    wp_enqueue_script('jquery-touch', 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js');
	wp_enqueue_script('swiper-script', 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js');
	wp_enqueue_script('script-selectize', 'https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.15.2/js/selectize.min.js');
	wp_enqueue_script('app-select2', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js');
    wp_enqueue_script( 'custom-script', get_template_directory_uri() . '/dist/js/app.min.js', array(), 'null', true );

}



add_image_size('boostmysocials-slider', 800, 600, true);







function mytheme_enqueue_scripts() {
    //wp_enqueue_script( 'jquery' );
}
add_action( 'wp_enqueue_scripts', 'mytheme_enqueue_scripts' );

add_theme_support('post-thumbnails');
add_theme_support('title-tag');
add_theme_support('custom-logo');

add_filter( 'upload_mimes', 'svg_upload_allow' );

# Add SVG
function svg_upload_allow( $mimes ) {
    $mimes['svg'] = 'image/svg+xml';

    return $mimes;
}

function add_custom_favicon() { 
    $favicon_url = 'https://boostmysocials.ae/wp-content/uploads/2023/05/elipse-logo.svg'; 
    echo '<link rel="icon" type="image/svg+xml" href="' . $favicon_url . '" sizes="any">'; 
} 
add_action('wp_head', 'add_custom_favicon');


# Data on the number of requests to the database in the footer of the admin panel
add_filter( 'admin_footer_text', 'wp_usage' ); // only in admin
function wp_usage(){
	if ( is_admin() ) {
		echo sprintf(
			__( 'SQL: %d за %s сек. %s MB', 'km' ),
			get_num_queries(),
			timer_stop( 0, 3 ),
			round( memory_get_peak_usage()/1024/1024, 2 )
		);
	}
}


//Register menu header
function mytheme_register_menus() {
    register_nav_menus( array(
        'header-menu' => 'Header Menu'
    ) );
}
add_action( 'init', 'mytheme_register_menus' );

function register_footer_menu() {
    register_nav_menu('footer-menu', 'Footer Menu');
}
add_action('after_setup_theme', 'register_footer_menu');



  


  





//Enable Woocommerce support
add_action( 'after_setup_theme', 'woocommerce_support' );
function woocommerce_support() {
    add_theme_support( 'woocommerce' );
}


//Remove style Woocommerce
//add_filter( 'woocommerce_enqueue_styles', '__return_false' );

//Add style cart-empty
function my_theme_enqueue_styles() {
    if ( is_cart() && WC()->cart->is_empty() ) {
        wp_enqueue_style( 'my-custom-style', get_stylesheet_directory_uri() . '/dist/css/style.min.css' );
    }
}
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );


//Remove photo product-page
add_filter( 'woocommerce_single_product_image_thumbnail_html', 'remove_product_images', 10, 2 );
add_filter( 'woocommerce_single_product_image_html', 'remove_product_images', 10, 2 );

function remove_product_images( $html, $post_id ) {
    if( is_product() ) {
        return '';
    }
    return $html;
}

//Remove Similar products
add_filter( 'woocommerce_output_related_products', 'remove_related_products', 10 );
function remove_related_products( $args ) {
    return array();
}

//Add style single-product
add_action( 'wp_enqueue_scripts', 'my_theme_single_product_styles' );
function my_theme_single_product_styles() {
    if ( is_product() ) {
        wp_enqueue_style( 'my-theme-single-product-styles', get_stylesheet_directory_uri() . '/dist/css/style.min.css', array(), '1.0' );
    }
}

//Remove SKU and Meta
add_filter( 'wc_product_sku_enabled', '__return_false' );
add_filter( 'woocommerce_product_single_meta', 'remove_product_meta', 10 );
 
function remove_product_meta() {
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
}



//Remove shipping second fields
add_filter( 'woocommerce_checkout_fields' , 'custom_override_checkout_fields' );
  
function custom_override_checkout_fields( $fields ) {
    unset($fields['shipping']);
    return $fields;
}

//Remove single meta
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );


//Remove summary price
function remove_single_price() {
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
}
add_action( 'woocommerce_single_product_summary', 'remove_single_price', 1 );

//Remove quantity
//add_filter( 'woocommerce_is_sold_individually', '__return_true' );

//Add h2 after title
/*add_action( 'woocommerce_single_product_summary', 'add_package_selection_title', 6 );
function add_package_selection_title() {
    echo '<h2 class="h2-single-product-custom">Choose please the package that suits you:</h2>';
}*/


//Add input by add to cart
function add_input_before_add_to_cart_button() {
    global $product;

    // Получаем категории товара
    $terms = get_the_terms($product->get_id(), 'product_cat');
    



    if ($terms && !is_wp_error($terms)) {
        // Получаем первую категорию
        $category = reset($terms);
        $category_name = $category->name;
        ?>
        <div class="input-add-to-cart-custom">
            <!--<label class="label-add-to-cart-custom">Link to your <?php echo esc_html($category_name); ?> page<b class="b-add-to-cart-custom">*</b></label>
            <input type="text" class="input-link-first" name="custom_link_to_page" placeholder="Link to the page" required>-->
        </div>
        <?php
    }
}

add_action('woocommerce_before_add_to_cart_button', 'add_input_before_add_to_cart_button');

add_filter('wc_add_to_cart_message_html', '__return_empty_string');
add_filter('wc_add_to_cart_message_html', '__return_false');


add_filter( 'wc_add_to_cart_message_html', '__return_empty_string' );
add_filter( 'wc_add_to_cart_message_html', '__return_false' );



//Page Checkout:

// Add placeholder text to first name and last name fields
add_filter( 'woocommerce_checkout_fields', 'add_placeholder_to_checkout_fields' );
function add_placeholder_to_checkout_fields( $fields ) {
    $fields['billing']['billing_first_name']['placeholder'] = 'First name';
    $fields['billing']['billing_last_name']['placeholder'] = 'Last name';
    $fields['billing']['billing_company']['placeholder'] = 'Company name (optional)';
    $fields['billing']['billing_postcode']['placeholder'] = 'Zip code';
    $fields['billing']['billing_phone']['placeholder'] = 'Phone';
    $fields['billing']['billing_email']['placeholder'] = 'E-mail';
    $fields['billing']['billing_city']['placeholder'] = 'Town / City';
	$fields['billing']['billing_state']['placeholder'] = 'State / County';
    return $fields;
}

//Remove coupon
add_filter( 'woocommerce_coupons_enabled', 'disable_coupons_checkout' );
function disable_coupons_checkout( $enabled ) {
    if ( is_checkout() ) {
        return false;
    }
    return $enabled;
}

//Cart to nav
add_filter( 'wp_nav_menu_items', 'add_cart_to_nav', 10, 2 );
function add_cart_to_nav( $items, $args ) {
    if ( class_exists( 'woocommerce' ) && $args->theme_location == 'primary' ) {
        ob_start();
        global $woocommerce;
        $cart_url = $woocommerce->cart->get_cart_url();
        $cart_count = $woocommerce->cart->cart_contents_count;
        ?>
        <li class="menu-item cart">
            <a class="cart-contents" href="<?php echo $cart_url; ?>" title="<?php _e( 'View your shopping cart' ); ?>">
                <?php if ( $cart_count > 0 ) { ?>
                    <span class="cart-count"><?php echo $cart_count; ?></span>
                <?php } ?>
                <i class="fa fa-shopping-cart"></i>
            </a>
        </li>
        <?php
        $items .= ob_get_clean();
    }
    return $items;
}

add_filter( 'woocommerce_before_main_content', 'remove_breadcrumbs_from_product_page' );

function remove_breadcrumbs_from_product_page() {
    if ( is_product() ) {
        remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0 );
    }
}



//Remove shop page
function redirect_shop_page() {
    if (is_shop()) {
        wp_redirect(home_url());
        exit;
    }
}

//add_action('template_redirect', 'redirect_shop_page');



//Add field to reviews Woocommerce
add_filter( 'comment_form_defaults', 'render_pros_cons_fields_for_anonymous_users', 10, 1 );
add_action( 'comment_form_top', 'render_pros_cons_fields_for_authorized_users' );
function get_pros_cons_fields_html() {
	ob_start();
	?>

	<div class="pcf-container">
		<div class="pcf-field-container">
			<label for="pros" class="pcf-field-container-label">Name<span class="required-reviews">*</span></label>
			<input id="pros" name="pros" type="text" placeholder="Name" required>
		</div>
		
		<div class="pcf-field-container">
			<label for="cons" class="pcf-field-container-label">Email<span class="required-reviews">*</span></label>
			<input id="cons" name="cons" type="text" placeholder="Email" required>
		</div>
	</div>

	<?php
	return ob_get_clean();
}

function render_pros_cons_fields_for_authorized_users() {
	if ( ! is_product() || ! is_user_logged_in() ) {
		return;
	}
	
	echo get_pros_cons_fields_html();
}

function render_pros_cons_fields_for_anonymous_users( $defaults ) {
	if ( ! is_product() || is_user_logged_in() ) {
		return;
	}
	
	$defaults['comment_notes_before'] .= get_pros_cons_fields_html();
	
	return $defaults;
}

//Save fields
add_action( 'comment_post', 'save_review_pros_and_cons', 10, 3 );
function save_review_pros_and_cons( $comment_id, $approved, $commentdata ) {
	// The pros and cons fields are not required, so we have to check if they're not empty
	$pros = isset( $_POST['pros'] ) ? $_POST['pros'] : '';
	$cons = isset( $_POST['cons'] ) ? $_POST['cons'] : '';
	
	// Spammers and hackers love to use comments to do XSS attacks.
	// Don't forget to escape the variables
	update_comment_meta( $comment_id, 'pros', esc_html( $pros ) );
	update_comment_meta( $comment_id, 'cons', esc_html( $cons ) );
}


add_filter( 'comment_text', 'add_pros_and_cons_to_review_text', 10, 1 );
function add_pros_and_cons_to_review_text( $text ) {
	// We don't want to modify a comment's text in the admin, and we don't need to modify the text of blog post commets
	if ( is_admin() || ! is_product() ) {
		return $text;
	}
	
	$pros = get_comment_meta( get_comment_ID(), 'pros', true );
	$cons = get_comment_meta( get_comment_ID(), 'cons', true );
	
	$pros_html = '<div class="pcf-row"><b>Pros: </b>' . esc_html( $pros ) . '</div>';
	$cons_html = '<div class="pcf-row"><b>Cons: </b>' . esc_html( $cons ) . '</div>';	
	
	$updated_text = $pros_html . $cons_html . $text;
	
	return $updated_text;
}


add_action( 'add_meta_boxes_comment', 'extend_comment_add_meta_box', 10, 1 );
function extend_comment_add_meta_box( $comment ) {
	// We don't need to show this metabox if a comment doesn't belong to a product
	$post_id = $comment->comment_post_ID;
	$product = wc_get_product( $post_id );
	
	if ( $product === null || $product === false ) {
		return;
	}
	
    add_meta_box( 'pcf_fields', 'Pros & Cons', 'render_pcf_fields_metabox', 'comment', 'normal', 'high' );
}


//add to admin fields
function render_pcf_fields_metabox ( $comment ) {
    $pros = get_comment_meta( $comment->comment_ID, 'pros', true );
    $cons = get_comment_meta( $comment->comment_ID, 'cons', true );
    wp_nonce_field( 'pcf_metabox_update', 'pcf_metabox_nonce', false );
    ?>
    <p>
        <label for="phone">Name:</label>
        <input type="text" name="pros" id="pros" value="<?php echo esc_attr( $pros ); ?>" class="widefat" />
    </p>
    <p>
        <label for="cons">Email:</label>
        <input type="text" name="cons" id="cons" value="<?php echo esc_attr( $cons ); ?>" class="widefat" />
    </p>
    <?php
}

add_action( 'edit_comment', 'save_pcf_changes', 10, 1 );
function save_pcf_changes( $comment_id ) {
	// First of all, let's validate the nonce
	if ( ! isset( $_POST['pcf_metabox_nonce'] ) || ! wp_verify_nonce( $_POST['pcf_metabox_nonce'], 'pcf_metabox_update') ) {
		wp_die( 'You can not do this action' );
	}
	
	if ( isset( $_POST['pros'] ) ) {
		$pros = $_POST['pros'];
		update_comment_meta( $comment_id, 'pros', esc_html( $pros ) );
	}
	
	if ( isset( $_POST['cons'] ) ) {
		$cons = $_POST['cons'];
		update_comment_meta( $comment_id, 'cons', esc_html( $cons ) );
	}
}



add_theme_support('acf');




function remove_shipping_from_thankyou_page( $fields ) {
    unset( $fields['shipping'] );
    return $fields;
}
add_filter( 'woocommerce_thankyou_order_details', 'remove_shipping_from_thankyou_page' );

//function filter product form catalog desktop
function filter_products_callback() { 
    if (isset($_POST['product_ids'])) { 
        $product_ids = explode(',', sanitize_text_field($_POST['product_ids'])); 
        $paged = (isset($_POST['paged'])) ? intval($_POST['paged']) : 1; 
 
        $args = array( 
            'post_type' => 'product', 
            'posts_per_page' => 9, // Установите количество товаров на странице равным 9 
            'paged' => $paged, 
            'tax_query' => array( 
                'relation' => 'AND', 
                array( 
                    'taxonomy' => 'product_type', 
                    'field' => 'slug', 
                    'terms' => 'variable', 
                ), 
            ), 
        ); 
 
        // Если выбрано "all", показываем все товары 
        if (in_array('all', $product_ids)) { 
            $args['posts_per_page'] = -1; 
        } else { 
            $args['post__in'] = $product_ids; 
        } 
 
        if (isset($_GET['filter_products'])) { 
            $product_ids = explode(',', $_GET['filter_products']); 
 
            // Добавьте условие для показа только вариативных товаров 
            $args['tax_query'][] = array( 
              'taxonomy' => 'product_cat', 
              'field' => 'term_id', 
              'terms' => $product_ids, 
              'operator' => 'IN', // Добавьте оператор 'IN' 
          ); 
        } 
        
 
        $query = new WP_Query($args); 
 
        if ($query->have_posts()) { 
            $counter = 0; 
            while ($query->have_posts()) { 
                $query->the_post(); 
                global $product; 
 
                // Вывод информации о товаре 
                if ($counter % 3 === 0) { 
                    echo '<div class="product-row">'; 
                } 
 
                // Получение ID галереи товара 
                $gallery_ids = $product->get_gallery_image_ids(); 
 
                // Проверка, есть ли фотографии в галерее товара 
                if (!empty($gallery_ids)) { 
 
                    // Вывод контента товара без основного изображения 
                    echo '<div class="product-content-catalog">'; 
                    // Вывод первой фотографии из галереи 
                    $image_id = $gallery_ids[0]; 
                    echo wp_get_attachment_image($image_id, 'full'); 
                    echo '<div class="product-info-catalog" data-product-id="' . $product_id . '">'; 
                    echo '<h2 class="product-title-catalog">' . get_the_title() . '</h2>'; 
 
                    // Вывод описания товара 
                    echo '<div class="product-description-catalog">' . get_the_content() . '</div>'; 
 
                    // Вывод кнопки "Buy now" 
                    echo '<a href="' . esc_url($product->get_permalink()) . '" class="button">' . __('Buy now', 'text-domain') . '</a>'; 
 
                    echo '</div>'; // Закрытие div.product-info 
                    echo '</div>'; // Закрытие div.product-content 
                } else { 
                    // Если нет фотографий в галерее, вывод контента товара со всеми изображениями 
                    wc_get_template_part('content', 'product'); 
                } 
 
                $counter++; 
 
                if ($counter % 3 === 0 || $counter === $query->post_count) { 
                    echo '</div>'; 
                } 
 
                // Прекратить цикл после вывода 9 товаров 
                if ($counter === 9) { 
                    break; 
                } 
            } 
        } 
 
        wp_reset_postdata(); 
    } 
 
    exit; 
}
add_action('wp_ajax_filter_products', 'filter_products_callback');
add_action('wp_ajax_nopriv_filter_products', 'filter_products_callback');



// Обработчик AJAX-запроса для добавления товара в корзину
function add_to_cart_callback() {
    if (isset($_POST['product_id'])) {
        $product_id = absint($_POST['product_id']);
        $variation_id = isset($_POST['variation_id']) ? absint($_POST['variation_id']) : 0;

        if ($variation_id > 0) {
            $product_data = wc_get_product($variation_id);
        } else {
            $product_data = wc_get_product($product_id);
        }

        if ($product_data) {
            $cart_item_key = WC()->cart->add_to_cart($product_data->get_id(), 1, $variation_id);
            if ($cart_item_key) {
                // update mini cart
                WC_AJAX::get_refreshed_fragments();

                echo json_encode(array('success' => true));
            } else {
                echo json_encode(array('success' => false));
            }
        }
    }

    wp_die();
}
add_action('wp_ajax_add_to_cart', 'add_to_cart_callback');
add_action('wp_ajax_nopriv_add_to_cart', 'add_to_cart_callback');

// delete hook woocommerce_template_single_title from woocommerce_single_product_summary
add_action('init', 'remove_product_title_from_summary');
function remove_product_title_from_summary() {
    remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_title', 5);
}





// Function for filter products mobile page catalog
add_action('wp_ajax_filter_products2', 'filter_products2');
add_action('wp_ajax_nopriv_filter_products2', 'filter_products2');
function filter_products2() {
    if (isset($_POST['product_ids'])) {
        $product_ids = explode(',', sanitize_text_field($_POST['product_ids']));
        $paged = (isset($_POST['paged'])) ? intval($_POST['paged']) : 1;

        $args = array(
            'post_type' => 'product',
            'posts_per_page' => 8,
            'paged' => $paged,
            'tax_query' => array(
                'relation' => 'AND',
                array(
                    'taxonomy' => 'product_type',
                    'field' => 'slug',
                    'terms' => 'variable',
                ),
            ),
        );

        // Если выбрано "all", показываем все товары
        if (in_array('all', $product_ids)) { 
            $args['posts_per_page'] = -1; 
        } else { 
            $args['post__in'] = $product_ids; 
        } 

        $query = new WP_Query($args);

        if ($query->have_posts()) {
            $counter = 0;
            while ($query->have_posts()) {
                $query->the_post();
                global $product;

                // Вывод информации о товаре
                if ($counter % 2 === 0) {
                    echo '<div class="product-row-mobile">';
                }

                // Получение ID галереи товара
                $gallery_ids = $product->get_gallery_image_ids();
                $product_id = get_the_ID(); // Добавлено получение ID товара

                // Проверка, есть ли фотографии в галерее товара
                if (!empty($gallery_ids)) {

                    // Вывод контента товара без основного изображения
                    echo '<div class="product-content-catalog-mobile">';
                    // Вывод первой фотографии из галереи
                    $image_id = $gallery_ids[0];
                    echo wp_get_attachment_image($image_id, 'full');
                    echo '<div class="product-info-catalog-mobile" data-product-id="' . $product_id . '">';
                    echo '<h2 class="product-title-catalog-mobile">' . get_the_title() . '</h2>';

                    // Вывод описания товара
                    echo '<div class="product-description-catalog-mobile">' . get_the_content() . '</div>';

                    // Вывод кнопки "Buy now"
                    echo '<a href="' . esc_url($product->get_permalink()) . '" class="button-mobile">' . __('Buy now', 'text-domain') . '</a>';

                    echo '</div>'; // Закрытие div.product-info
                    echo '</div>'; // Закрытие div.product-content
                } else {
                    // Если нет фотографий в галерее, вывод контента товара со всеми изображениями
                    wc_get_template_part('content', 'product');
                }

                $counter++;

                if ($counter % 2 === 0 || $counter === $query->post_count) {
                    echo '</div>';
                }
				
				// Прекратить цикл после вывода 9 товаров 
                if ($counter === 8) { 
                    break; 
                } 
            }
        }

        wp_reset_postdata();
    }

    exit;
}


//Remove field country from checkout
add_filter('woocommerce_checkout_fields', 'remove_country_field');

function remove_country_field($fields) {
    unset($fields['billing']['billing_country']);
    unset($fields['shipping']['shipping_country']);
    return $fields;
}

//Add checkbox for privacy policy on checkout page
function add_custom_checkbox() {
    // Выводим обязательный чекбокс
    echo '<p class="form-row validate-required">';
    echo '<label class="woocommerce-form__label woocommerce-form__label-for-checkbox checkbox">';
    echo '<input class="woocommerce-form__input woocommerce-form__input-checkbox input-checkbox" name="privacy_policy_checkbox" type="checkbox" value="1" required />';
    echo ' I agree with the page <a href="https://boostmysocials.ae/privacy-policy/">privacy policy.</a>';
    echo '</label>';
    echo '</p>';
}
add_action( 'woocommerce_review_order_before_submit', 'add_custom_checkbox' );

// Проверяем, что чекбокс был отмечен перед размещением заказа
function validate_privacy_policy_checkbox() {
    if ( ! isset( $_POST['privacy_policy_checkbox'] ) ) {
        wc_add_notice( 'You must agree to the privacy policy.', 'error' );
    }
}
add_action( 'woocommerce_checkout_process', 'validate_privacy_policy_checkbox' );




//plugin woocommerce add to cart popup ajax
function woocommerce_ajax_add_to_cart_js() {
    if (function_exists('is_product') && is_product()) {
        wp_enqueue_script('woocommerce-ajax-add-to-cart', plugin_dir_url(__FILE__) . 'assets/ajax-add-to-cart.js', array('jquery'), '', true);
    }
}
add_action('wp_enqueue_scripts', 'woocommerce_ajax_add_to_cart_js', 99);




add_filter('woocommerce_cart_item_quantity', 'set_variation_quantity_field', 10, 3);
function set_variation_quantity_field($product_quantity, $cart_item_key, $cart_item) {
    // Проверяем, является ли товар вариативным
    if ($cart_item['data']->is_type('variation')) {
        // Возвращаем значение "1" в поле количества
        return '1';
    }

    // Для остальных товаров отображаем поле количества
    return $product_quantity;
}







add_action('woocommerce_thankyou', 'hide_custom_link_to_page_on_thankyou');
function hide_custom_link_to_page_on_thankyou($order_id) {
    echo '<style>.woocommerce-order-details .custom-link-to-page { display: none; }</style>';
}

// Сохранение значения поля "Link to the page" в корзине
add_filter('woocommerce_add_cart_item_data', 'save_custom_cart_item_data', 10, 2);
function save_custom_cart_item_data($cart_item_data, $product_id) {
    if (isset($_POST['custom_link_to_page'])) {
        $cart_item_data['custom_link_to_page'] = sanitize_text_field($_POST['custom_link_to_page']);
    }
    return $cart_item_data;
}

// Отображение значения поля "Link to the page" в корзине
add_filter('woocommerce_get_item_data', 'display_custom_cart_item_data', 10, 2);
function display_custom_cart_item_data($cart_item_data, $cart_item) {
    if (isset($cart_item['custom_link_to_page'])) {
        $cart_item_data[] = array(
            'name' => __('Link to the page'),
            'value' => $cart_item['custom_link_to_page']
        );
    }
    return $cart_item_data;
}

// Сохранение значения поля "Link to the page" в заказе
add_action('woocommerce_checkout_create_order_line_item', 'save_custom_order_item_meta', 20, 4);
function save_custom_order_item_meta($item, $cart_item_key, $values, $order) {
    if (isset($values['custom_link_to_page'])) {
        $item->update_meta_data(__('Link to the page'), $values['custom_link_to_page']);
    }
}




// Сохранение значения поля "Link to the page" в корзине
add_action('wp_ajax_add_custom_cart_item_data', 'add_custom_cart_item_data');
add_action('wp_ajax_nopriv_add_custom_cart_item_data', 'add_custom_cart_item_data');
function add_custom_cart_item_data() {
    if (isset($_POST['product_id']) && isset($_POST['custom_link_to_page'])) {
        $product_id = sanitize_text_field($_POST['product_id']);
        $custom_link_to_page = sanitize_text_field($_POST['custom_link_to_page']);

        $cart_item_data = array();
        $cart_item_data['custom_link_to_page'] = $custom_link_to_page;

        WC()->cart->add_to_cart($product_id, 1, 0, array(), $cart_item_data);

        wp_send_json_success();
    } else {
        wp_send_json_error();
    }
}


// Добавление полей минимального и максимального количества к простым товарам
function add_quantity_fields_to_simple_product() {
    global $post;

    // Проверяем тип поста, чтобы применить только к простым товарам
    if ( 'product' !== $post->post_type ) {
        return;
    }

    // Получаем значения минимального и максимального количества товара
    $min_quantity = get_post_meta( $post->ID, '_min_quantity', true );
    $max_quantity = get_post_meta( $post->ID, '_max_quantity', true );

    // Выводим поля на странице редактирования товара
    ?>
    <div class="options_group">
        <?php
        // Поле минимального количества
        woocommerce_wp_text_input( array(
            'id'          => '_min_quantity',
            'label'       => __( 'Minimum Quantity', 'your-textdomain' ),
            'placeholder' => 'Enter minimum quantity',
            'desc_tip'    => 'true',
            'description' => __( 'Enter the minimum quantity for the product.', 'your-textdomain' ),
            'value'       => $min_quantity,
        ) );

        // Поле максимального количества
        woocommerce_wp_text_input( array(
            'id'          => '_max_quantity',
            'label'       => __( 'Maximum Quantity', 'your-textdomain' ),
            'placeholder' => 'Enter maximum quantity',
            'desc_tip'    => 'true',
            'description' => __( 'Enter the maximum quantity for the product.', 'your-textdomain' ),
            'value'       => $max_quantity,
        ) );

        woocommerce_wp_text_input( array(
            'id'          => '_step',
            'label'       => __( 'Step', 'your-textdomain' ),
            'placeholder' => 'Enter step value',
            'desc_tip'    => 'true',
            'description' => __( 'Enter the step value for quantity increment.', 'your-textdomain' ),
            'value'       => get_post_meta( $post->ID, '_step', true ),
        ) );
        ?>
    </div>
    <?php
}
add_action( 'woocommerce_product_options_inventory_product_data', 'add_quantity_fields_to_simple_product' );

function save_quantity_fields_for_simple_product( $product ) {
    // Проверяем, является ли товар простым
    if ( $product->is_type('simple') ) {
        // Сохраняем значение минимального количества
        if ( isset( $_POST['_min_quantity'] ) ) {
            $min_quantity = wc_clean( $_POST['_min_quantity'] );
            $product->update_meta_data( '_min_quantity', $min_quantity );
            error_log( 'Минимальное количество: ' . $min_quantity ); // Отладочный вывод
        }

        // Сохраняем значение максимального количества
        if ( isset( $_POST['_max_quantity'] ) ) {
            $max_quantity = wc_clean( $_POST['_max_quantity'] );
            $product->update_meta_data( '_max_quantity', $max_quantity );
            error_log( 'Максимальное количество: ' . $max_quantity ); // Отладочный вывод
        }

        // Сохраняем значение шага инкремента
        if ( isset( $_POST['_step'] ) ) {
            $step = wc_clean( $_POST['_step'] );
            $product->update_meta_data( '_step', $step );
            error_log( 'Шаг инкремента: ' . $step ); // Отладочный вывод
        }
    }
}
add_action( 'woocommerce_admin_process_product_object', 'save_quantity_fields_for_simple_product' );




