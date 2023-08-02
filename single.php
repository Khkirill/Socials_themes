<?php get_header(); ?>
<main class="post__news-main" style="min-height: 100vh">
    <?= the_content() ?>
    <section class="author-block">
        <div class="container">
				<h2>About the Author</h2>
            <div class="author-block__content">
				<div class="author-block-main-link">
					<div class="author-block__avatar-links">
						<div>
						<p class="author-block__avatar-links-p"><?php echo get_the_author_meta('display_name'); ?></p>	
						<div class="author-block__link">
							<?php
								$author_id = get_post_field('post_author', get_the_ID());
								$instagram_link = get_field('instagram_link', 'user_' . $author_id);
								$twitter_link = get_field('twitter_link', 'user_' . $author_id);
								$facebook_link = get_field('facebook_link', 'user_' . $author_id);
								$youtube_link = get_field('youtube_link', 'user_' . $author_id);

								if ($facebook_link) {
									$url = esc_url($instagram_link);
									echo '<a href="' . $url . '">';
									echo '<img src="' . esc_url(get_template_directory_uri() . '/src/img/author/icon-instagram.svg') . '" alt="Facebook">';
									echo '</a>';
								}


								if ($facebook_link) {
									$url = esc_url($instagram_link);
									echo '<a href="' . $url . '">';
									echo '<img src="' . esc_url(get_template_directory_uri() . '/src/img/author/icon-twitter.svg') . '" alt="Facebook">';
									echo '</a>';
								}


								if ($facebook_link) {
									$url = esc_url($facebook_link);
									echo '<a href="' . $url . '">';
									echo '<img src="' . esc_url(get_template_directory_uri() . '/src/img/author/icon-facebook.svg') . '" alt="Facebook">';
									echo '</a>';
								}

								if ($facebook_link) {
									$url = esc_url($youtube_link);
									echo '<a href="' . $url . '">';
									echo '<img src="' . esc_url(get_template_directory_uri() . '/src/img/author/icon-youtube.svg') . '" alt="Facebook">';
									echo '</a>';
								} 
							?>
							
					</div>
						</div>
						<div class="author-block__avatar">
						<?php echo get_avatar(get_the_author_meta('ID'), 580); ?>
					</div>
				</div>	
			</div>
					
                <div class="author-block__info">
                    <p class="author-block__description"><?php echo get_the_author_meta('description'); ?></p>
					<a href="<?php echo get_author_posts_url(get_the_author_meta('ID')); ?>">See all Authors Articles</a>

                </div>
            </div>
           
        </div>
    </section>
</main>

<?php get_footer(); ?>