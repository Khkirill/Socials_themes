<?php
/*
Template name: Catalog page
*/
?>

<?php get_header(); ?>

<div class="category-page-custom">

    <?php
    // Получение всех категорий
    $categories = get_terms(array(
        'taxonomy' => 'product_cat',
        'hide_empty' => false,
    ));

    // Фильтрация категории "Simple"
    $categories = array_filter($categories, function($category) {
        return $category->slug !== 'simple';
    });

    

    // Если есть категории, выводим фильтры
    if (!empty($categories)) {
        echo '<div class="product-filters">';
        echo '<div class="category-filter-icon">';
        echo '<h3>Filter</h3>';
        echo '<img src="' . get_template_directory_uri() . '/src/img/new1/icon-filter.svg" alt="">';
        echo '</div>';
        // Вывод выпадающих списков категорий
        foreach ($categories as $category) {
            $category_id = $category->term_id;
            $category_name = $category->name;

            echo '<div class="category-filter">';
            echo '<div class="category-filter-block" data-category-id="' . $category_id . '">';
            echo '<h3 id="category-filter-h3">' . $category_name . '</h3>';
            echo '<img src="' . get_template_directory_uri() . '/src/img/single-product/others-icon.svg" alt="">';
            echo '</div>';

            // Получение товаров для каждой категории
            $args = array(
                'post_type' => 'product',
                'posts_per_page' => -1,
                'tax_query' => array(
                    array(
                        'taxonomy' => 'product_cat',
                        'field' => 'term_id',
                        'terms' => $category_id,
                    ),
                ),
            );

            $products = new WP_Query($args);

            echo '<div class="category-filter-dropdown">';
            // Вывод товаров с чекбоксами для данной категории
            if ($products->have_posts()) {
              while ($products->have_posts()) {
                  $products->the_post();
                  $product_id = get_the_ID();
                  $product_name = get_the_title();
          
                  // Проверяем, был ли передан параметр фильтрации и если да, то проверяем, нужно ли выбрать данный товар
                  $isFiltered = isset($_GET['filter_products']) && in_array($product_id, explode(',', $_GET['filter_products']));
                  
                  echo '<label><input type="checkbox" onchange="filterProducts()" id="filtered-products-' . $product_id . '" class="product-checkbox" value="' . $product_id . '"' . ($isFiltered ? ' checked' : '') . '>' . $product_name . '</label>';
              }
          }

            wp_reset_postdata();
            echo '</div>';

            echo '</div>'; // Закрытие div.category-filter
        }

        echo '</div>'; // Закрытие div.product-filters
    }
    ?>


    
<div id="filtered-products">
    <?php
    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
    $args = array(
        'post_type' => 'product',
        'posts_per_page' => 9,
        'paged' => $paged,
    );

    // Добавление фильтрации по выбранным товарам
    if (isset($_GET['filter_products'])) {
        $product_ids = explode(',', $_GET['filter_products']);

        // Добавьте условие для показа только вариативных товаров
        $args['tax_query'] = array(
            'relation' => 'AND',
            array(
                'taxonomy' => 'product_type',
                'field' => 'slug',
                'terms' => 'variable',
            ),
            array(
                'taxonomy' => 'product_cat',
                'field' => 'slug',
                'terms' => $product_ids,
                'operator' => 'IN',
            ),
        );
    } else {
        // Исключение товаров типа "simple"
        $args['tax_query'] = array(
            'relation' => 'AND',
            array(
                'taxonomy' => 'product_type',
                'field' => 'slug',
                'terms' => 'variable',
                'operator' => 'IN',
            ),
            array(
                'taxonomy' => 'product_type',
                'field' => 'slug',
                'terms' => 'simple',
                'operator' => 'NOT IN',
            ),
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
                $product_link = get_permalink($product->get_id());
                echo '<a href="' . $product_link . '">';
                echo wp_get_attachment_image($image_id, 'full');
                echo '</a>';
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

            if ($counter % 3 === 0 && $counter !== 0) {
                echo '</div>';
            }
        }

        if ($counter % 3 !== 0) {
            echo '</div>';
        }

        wp_reset_postdata();
    }
    ?>
    <div class="pagination-custom-news">
    <?php
    $big = 999999999; // число для замены
    echo paginate_links(array(
        'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
        'format' => '?paged=%#%',
        'current' => max(1, get_query_var('paged')),
        'total' => $query->max_num_pages,
        'prev_next' => true,
        'prev_text' => '<img class="img-news-custom-arrow" src="' . get_template_directory_uri() . '/src/img/new1/icon-arrow2.svg">',
        'next_text' => '<img class="img-news-custom-arrow" src="' . get_template_directory_uri() . '/src/img/new1/icon-arrow.svg">',
    ));
    ?>
</div>
</div>



</div>











<div class="category-page-custom-mobile">
    <?php
    // Получение всех категорий
    $categories = get_terms(array(
        'taxonomy' => 'product_cat',
        'hide_empty' => false,
    ));

    // Фильтрация категории "Simple"
    $categories = array_filter($categories, function ($category) {
        return $category->slug !== 'simple';
    });

    // Если есть категории, выводим фильтры
    if (!empty($categories)) {
        echo '<div class="category-filter-icon-mobile" data-target="category-filter-mobile">';
        echo '<h3>Filter</h3>';
        echo '<img src="' . get_template_directory_uri() . '/src/img/new1/icon-filter.svg" alt="">';
        echo '</div>';

        echo '<div class="popup-overlay" id="popup-overlay">';
        echo '<div class="category1-filter-icon-mobile1">';
        echo '<div class="category-filter-icon-mobile1" data-target="category-filter-mobile">';
        echo '<h3>Filter</h3>';
        echo '<img src="' . get_template_directory_uri() . '/src/img/new1/icon-filter.svg" alt="">';
        echo '</div>';
        echo '<img class="category-filter-edit-popup" src="' . get_template_directory_uri() . '/src/img/new1/icon-cross.svg" alt="">';
        echo '</div>';
        echo '<div class="product-filters-mobile" id="category-filter-mobile">';

        // Вывод выпадающих списков категорий
        foreach ($categories as $category) {
            $category_id = $category->term_id;
            $category_name = $category->name;

            echo '<div class="category-filter-mobile">';
            echo '<div class="category-filter-block-mobile" data-category-id="' . $category_id . '" data-target="category-filter-dropdown-mobile">';
            echo '<h3 id="category-filter-h3-mobile">' . $category_name . '</h3>';
            echo '<img src="' . get_template_directory_uri() . '/src/img/single-product/others-icon.svg" alt="">';
            echo '</div>';

            // Получение товаров для каждой категории
            $args = array(
                'post_type' => 'product',
                'posts_per_page' => -1,
                'tax_query' => array(
                    array(
                        'taxonomy' => 'product_cat',
                        'field' => 'term_id',
                        'terms' => $category_id,
                    ),
                ),
            );

            $products = new WP_Query($args);

            echo '<div class="category-filter-dropdown-mobile" id="category-filter-dropdown-mobile">';
            // Вывод товаров с чекбоксами для данной категории
            if ($products->have_posts()) {
                while ($products->have_posts()) {
                    $products->the_post();
                    $product_id = get_the_ID();
                    $product_name = get_the_title();
                    echo '<label><input type="checkbox" onchange="filterProducts2()" id="mobile-filtered-products-' . $product_id . '" class="product-checkbox-mobile" value="' . $product_id . '">' . $product_name . '</label>';
                }
            }

            wp_reset_postdata();
            echo '</div>';
            echo '<img class="category-line-dropdown-mobile" src="' . get_template_directory_uri() . '/src/img/new1/Rectangle-240.svg" alt="">';

            echo '</div>'; // Закрытие div.category-filter
        }

        echo '<div class="category-apply-mobile">';
        echo '<a class="category-apply-mobile-first">Clear all</a>';
        echo '<a class="category-apply-mobile-second">Apply</a>';
        echo '</div>';

        echo '</div>'; // Закрытие div.product-filters
        echo '</div>';
    }
    ?>

    <div class="category-page-content-mobile">
        <div id="filtered-products-mobile">
            <?php
            $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
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

            // Добавление фильтрации по выбранным товарам
            if (isset($_GET['filter_products'])) {
                $product_categories = explode(',', $_GET['filter_products']);
                $args['tax_query'][] = array(
                    'taxonomy' => 'product_cat',
                    'field' => 'slug',
                    'terms' => $product_categories,
                    'operator' => 'IN',
                );
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
                }
            }

            wp_reset_postdata();
            ?>
        </div>
        <div class="pagination-custom-news">
            <?php
            $big = 999999999; // число для замены
            echo paginate_links(array(
                'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                'format' => '?paged=%#%',
                'current' => max(1, get_query_var('paged')),
                'total' => $query->max_num_pages,
                'prev_next' => true,
                'prev_text' => '<img class="img-news-custom-arrow" src="' . get_template_directory_uri() . '/src/img/new1/icon-arrow2.svg">',
                'next_text' => '<img class="img-news-custom-arrow" src="' . get_template_directory_uri() . '/src/img/new1/icon-arrow.svg">',
            ));
            ?>
        </div>
    </div>
</div>

<script>

	document.addEventListener('DOMContentLoaded', function() {
  var categoryFilterIconMobile = document.querySelector('.category-filter-icon-mobile');
  var categoryFilterMobile = document.querySelector('#category-filter-mobile');
  var popupOverlay = document.querySelector('#popup-overlay');
  var categoryApplyMobileFirst = document.querySelector('.category-apply-mobile-second');
  var categoryEditPopup = document.querySelector('.category-filter-edit-popup');
		
  categoryEditPopup.addEventListener('click', function() {
    categoryFilterMobile.classList.remove('popup-opened');
    popupOverlay.style.display = 'none';
  });	

  categoryFilterIconMobile.addEventListener('click', function() {
    categoryFilterMobile.classList.add('popup-opened');
    popupOverlay.style.display = 'block';
  });

  categoryApplyMobileFirst.addEventListener('click', function() {
    categoryFilterMobile.classList.remove('popup-opened');
    popupOverlay.style.display = 'none';
  });

  // Здесь остальной JavaScript-код для обработки фильтрации товаров
	
	
	
    var categoryFilters = document.getElementsByClassName('category-filter-block-mobile');

    // Скрытие всех выпадающих списков категорий при загрузке страницы
    hideAllDropdowns();

    

    // Обработчик клика на категорию
    for (var i = 0; i < categoryFilters.length; i++) {
      var filter = categoryFilters[i];
      var dropdown = filter.nextElementSibling;
      var categoryId = filter.getAttribute('data-category-id');

      filter.addEventListener('click', function(event) { 
    event.preventDefault(); 
    toggleDropdown(this.nextElementSibling); 
		  
	var categoryApplyMobileFirst = document.querySelector('.category-apply-mobile-first');
		  categoryApplyMobileFirst.addEventListener('click', function() {
    categoryFilterMobile.classList.remove('popup-opened');
    popupOverlay.style.display = 'none';

    // Сброс выбранных чекбоксов
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }

    // Вызов функции фильтрации товаров
    filterProducts2();
  });

    
    // Получить элемент изображения внутри текущего блока 
    var image = this.querySelector('img'); 
  
    // Переключить класс для переворота изображения 
    image.classList.toggle('flipped'); 
  });

      
    }

    // Функция скрытия всех выпадающих списков категорий
    function hideAllDropdowns() {
      for (var i = 0; i < categoryFilters.length; i++) {
        categoryFilters[i].nextElementSibling.style.display = 'none';
      }
    }

    // Функция переключения видимости выпадающего списка
    function toggleDropdown(dropdown) {
      if (dropdown.style.display === 'none') {
        hideAllDropdowns();
        dropdown.style.display = 'flex';
      } else {
        dropdown.style.display = 'none';
      }
    }

    var checkboxes = document.getElementsByClassName('product-checkbox-mobile');

    // Добавьте обработчик изменения состояния чекбоксов товаров
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('change', function() {
        filterProducts2();
      });
    }

    // Функция для фильтрации товаров
    function filterProducts2() {
      var selectedProducts = [];

      // Получение выбранных товаров
      var checkboxes = document.getElementsByClassName('product-checkbox-mobile');
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          selectedProducts.push(checkboxes[i].value);
        }
      }

      // Если не выбран ни один чекбокс, устанавливаем значение "all"
      if (selectedProducts.length === 0) {
        selectedProducts.push('all');
      }

      // Отправка AJAX-запроса на сервер
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Обновление содержимого блока #filtered-products
          document.getElementById('filtered-products-mobile').innerHTML = xhr.responseText;
        }
      };

      var data = new FormData();
      data.append('action', 'filter_products2');
      data.append('product_ids', selectedProducts.join(','));

      xhr.open('POST', '<?php echo admin_url('admin-ajax.php'); ?>', true);
      xhr.send(data);
    }
  });
</script>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    var categoryFilters = document.getElementsByClassName('category-filter-block');

    // Скрытие всех выпадающих списков категорий при загрузке страницы
    hideAllDropdowns();

    

    // Обработчик клика на категорию
    for (var i = 0; i < categoryFilters.length; i++) {
      var filter = categoryFilters[i];
      var dropdown = filter.nextElementSibling;
      var categoryId = filter.getAttribute('data-category-id');

      filter.addEventListener('click', function(event) { 
    event.preventDefault(); 
    toggleDropdown(this.nextElementSibling); 
    
    // Получить элемент изображения внутри текущего блока 
    var image = this.querySelector('img'); 
  
    // Переключить класс для переворота изображения 
    image.classList.toggle('flipped'); 
  });

      
    }

    // Функция скрытия всех выпадающих списков категорий
    function hideAllDropdowns() {
      for (var i = 0; i < categoryFilters.length; i++) {
        categoryFilters[i].nextElementSibling.style.display = 'none';
      }
    }

    // Функция переключения видимости выпадающего списка
    function toggleDropdown(dropdown) {
      if (dropdown.style.display === 'none') {
        hideAllDropdowns();
        dropdown.style.display = 'block';
      } else {
        dropdown.style.display = 'none';
      }
    }

    var checkboxes = document.getElementsByClassName('product-checkbox');

    // Добавьте обработчик изменения состояния чекбоксов товаров
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('change', function() {
        filterProducts();
      });
    }

    // Функция для фильтрации товаров
    function filterProducts() {
      var selectedProducts = [];

      // Получение выбранных товаров
      var checkboxes = document.getElementsByClassName('product-checkbox');
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          selectedProducts.push(checkboxes[i].value);
        }
      }

      // Если не выбран ни один чекбокс, устанавливаем значение "all"
      if (selectedProducts.length === 0) {
        selectedProducts.push('all');
      }

      // Отправка AJAX-запроса на сервер
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Обновление содержимого блока #filtered-products
          document.getElementById('filtered-products').innerHTML = xhr.responseText;
        }
      };

      var data = new FormData();
      data.append('action', 'filter_products');
      data.append('product_ids', selectedProducts.join(','));

      xhr.open('POST', '<?php echo admin_url('admin-ajax.php'); ?>', true);
      xhr.send(data);
    }

    

   
  });
</script>



<?php get_footer(); ?>