<?php
/*
Template Name: News Template
*/

get_header(); ?>

<?php
// выводим хлебные крошки от Yoast SEO
if (function_exists('yoast_breadcrumb')) {
    yoast_breadcrumb('<p id="breadcrumbs">', '</p>');
}
?>

<div id="primary-news" class="content-area">
  <main id="main-news" class="site-main-news">

    <!-- First block with photo, text and button -->
    <div class="first-block-news">
        <?php
            $args = array(
                'post_type' => 'post',
                'posts_per_page' => 1 // Выбираем одну запись
            );

            $query = new WP_Query( $args );
            if ( $query->have_posts() ) :
                while ( $query->have_posts() ) : $query->the_post();
        ?>
        <?php if ( has_post_thumbnail() ) : ?>
            <div class="photo-news-custom">
                <img class="news-photo-main" src="<?php echo esc_url( the_post_thumbnail_url() ); ?>">
            </div>
        <?php endif; ?>
        <div class="text-custom-news">
            <h2><?php the_title(); ?></h2>
            <?php the_excerpt(); ?>
            <a class="button-custom-news" href="<?php the_permalink(); ?>">Read more</a>
        </div>
        <?php endwhile; endif; wp_reset_postdata(); ?>
    </div>

    <!-- Posts in 2 columns -->
    <div class="posts-custom-news">
      <?php
        // Exclude posts that were already displayed in the first block
        $exclude_posts = array();
        if ( have_posts() ) {
          while ( have_posts() ) {
            the_post();
            $exclude_posts[] = get_the_ID();
          }
        }

        // Query the remaining posts
        $paged = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;
        $args = array(
          'post_type'      => 'post',
          'post__not_in'   => $exclude_posts,
          'posts_per_page' => 8,
          'paged'          => $paged,
        );
        $the_query = new WP_Query( $args );

        if ( $the_query->have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
        <div class="post-block-custom">
        <?php if ( has_post_thumbnail() ) : ?>
            <div class="photo-news-custom">
                <img class="news-photo-post" src="<?php echo esc_url( the_post_thumbnail_url() ); ?>">
            </div>
        <?php endif; ?>
          <div class="post-block-text-custom">
            <h2><?php the_title(); ?></h2>
            <?php the_excerpt(); ?>
            <a href="<?php the_permalink(); ?>">Read more</a>
          </div>
        </div>
        <?php if ( $the_query->current_post % 2 != 0 ) : ?>
          <div class="clear-news"></div>
        <?php endif; ?>
      <?php endwhile; endif; ?>
    </div>

    <!-- Pagination -->
    <div class="pagination-custom-news">
        <?php
            $big = 999999999; // число для замены
            echo paginate_links(array(
                'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
                'format' => '?paged=%#%',
                'current' => max(1, get_query_var('paged')),
                'total' => $the_query->max_num_pages,
                'prev_next' => true,
                'prev_text' => '<img class="img-news-custom-arrow" src="' . get_template_directory_uri() . '/src/img/news/arrow-news.svg">',
                'next_text' => '<img class="img-news-custom-arrow" src="' . get_template_directory_uri() . '/src/img/news/arrow-news-right.svg">',
            ));
        ?>
    </div>

  </main>
</div>

<?php get_footer(); ?>