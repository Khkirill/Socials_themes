<?php
/*
Template Name: Author
*/
get_header();

// Получение имени автора из URL
$author_slug = get_query_var('author_name');
$author = get_user_by('slug', $author_slug);

// Проверка наличия автора
if (!$author) {
    // Если автор не найден, выводим сообщение об ошибке или перенаправляем на другую страницу
    echo 'Автор не найден.';
} else {
    $author_id = $author->ID;

    // Получение информации об авторе
    $first_name = get_the_author_meta('first_name', $author_id);
    $last_name = get_the_author_meta('last_name', $author_id);
    $description = get_the_author_meta('description', $author_id);

    // Вывод информации об авторе
    ?>
    <section class="author-section">
    <div class="author-section-div">
        <div class="author-avatar">
            <?php echo get_avatar($author_id, 550); ?>
        </div>
        <div class="author-info">
            <h1 class="author-name"><?php echo $first_name . ' ' . $last_name; ?></h1>
            <div class="author-bio">
                <?php echo wpautop($description); ?>
            </div>
        </div>
    </div>
    </section>

    <?php
    // Вывод последних 3 статей автора
    $args = array(
        'author' => $author_id,
        'posts_per_page' => 3,
        'order' => 'DESC',
        'orderby' => 'date'
    );
    $author_posts = new WP_Query($args);

    if ($author_posts->have_posts()) {
        echo '<div class="author__latest-posts">';
        echo '<div class="container">';
        echo '<h2>Latest publications</h2>';
        echo '<div class="author__first-posts">';
        while ($author_posts->have_posts()) {
            $author_posts->the_post();
            echo '<div class="author__first-post">
                <a class="author__first-post-a" href="' . get_permalink() . '">
                    <img src="' . get_the_post_thumbnail_url(get_the_ID(), 'large') . '" alt="' . get_the_title() . '">
                </a>
                <div class="author__first-post-div">
                <h2 class="author__latest-posts-h">' . get_the_title() . '</h2>
                <p>' . get_the_excerpt() . '</p>
                <a class="author__button-read" href="' . get_permalink() . '">Read more</a>
                </div>
            </div>';
        }
        echo '</div>';
        echo '</div>';
        echo '</div>';
        wp_reset_postdata();
    } else {
        echo 'Статей автора не найдено.';
    }

    // Вывод первых 3 статей автора
    $args_first = array(
        'author' => $author_id,
        'posts_per_page' => 3,
        'order' => 'ASC',
        'orderby' => 'date'
    );
    $author_posts_first = new WP_Query($args_first);

    if ($author_posts_first->have_posts()) {
        echo '<div class="author__firsts-posts">';
        echo '<div class="container">';
        echo '<h2>First publications</h2>';
		echo '<div class="author__first-posts">';
        while ($author_posts_first->have_posts()) {
            $author_posts_first->the_post();
            echo '<div class="author__first-post">
                <a class="author__first-post-a" href="' . get_permalink() . '">
                    <img src="' . get_the_post_thumbnail_url(get_the_ID(), 'thumbnail') . '" alt="' . get_the_title() . '">
                </a>
                <div class="author__first-post-div">
                <h2 class="author__firsts-posts-h">' . get_the_title() . '</h2>
                <p>' . get_the_excerpt() . '</p>
                <a class="author__button-read" href="' . get_permalink() . '">Read more</a>
                </div>
            </div>';
        }
		echo '</div>';
        echo '</div>';
        echo '</div>';
        wp_reset_postdata();
    } else {
        echo 'Статей автора не найдено.';
    }
}

get_footer();
?>