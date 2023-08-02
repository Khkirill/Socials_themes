<?php
/**
 * Display single product reviews (comments)
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product-reviews.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 4.3.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

if ( ! comments_open() ) {
	return;
}

?>

<div id="reviews" class="woocommerce-Reviews custom-review-followers">
		<div class="block">
			<div class="container">
				<div class="swiper block-slider"  data-aos="slide-right">
					<div class="swiper-button-prev" id="reviews-prev-button">
						<img src="<?php bloginfo('template_url'); ?>/src/img/left.svg" alt="left">
					</div>

					<div class="swiper-wrapper">
						<div class="swiper-slide block-slide">
							<div class="block__item">
								<div class="block__first">
									<h4>Jacob Worcester</h4>
									<h5>3 mounth ago</h5>
								</div>
								<img src="<?php bloginfo('template_url'); ?>/src/img/frame-rating.svg" alt="" class="block__rating">
								<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.....
								</p>
							</div>

							<div class="block__item">
								<div class="block__first">
									<h4>Jacob Worcester</h4>
									<h5>3 mounth ago</h5>
								</div>
								<img src="<?php bloginfo('template_url'); ?>/src/img/frame-rating.svg" alt="" class="block__rating">
								<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.....
								</p>
							</div>

							<div class="block__item">
								<div class="block__first">
									<h4>Jacob Worcester</h4>
									<h5>3 mounth ago</h5>
								</div>
								<img src="<?php bloginfo('template_url'); ?>/src/img/frame-rating.svg" alt="" class="block__rating">
								<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.....
								</p>
							</div>
						</div>
						
					</div>

					<div class="swiper-button-next" id="reviews-prev-button">
						<img src="<?php bloginfo('template_url'); ?>/src/img/right.svg" alt="right">
					</div>
				</div>
			</div>
		</div>

	<?php if ( get_option( 'woocommerce_review_rating_verification_required' ) === 'no' || wc_customer_bought_product( '', get_current_user_id(), $product->get_id() ) ) : ?>
		<h2 class="reviews-custom-h2">If you would like to leave feedback, please fill out the form below:</h2>
		<div id="review_form_wrapper">
			<div id="review_form">
				<?php
				$commenter    = wp_get_current_commenter();
				$name_email_required = true;

					

					$comment_form = array(
						/* translators: %s is product title */
						'title_reply'         => have_comments() ? esc_html__( 'Add a review', 'woocommerce' ) : sprintf( esc_html__( 'Be the first to review &ldquo;%s&rdquo;', 'woocommerce' ), get_the_title() ),
						/* translators: %s is product title */
						'title_reply_to'      => esc_html__( 'Leave a Reply to %s', 'woocommerce' ),
						'title_reply_before'  => '<span id="reply-title" class="comment-reply-title">',
						'title_reply_after'   => '</span>',
						'comment_notes_after' => '',
						'label_submit'        => esc_html__( 'Send', 'woocommerce' ),
						'logged_in_as'        => '',
						'comment_field'       => '',
						'fields'              => $fields,
					);

				

				$comment_form['fields'] = array();

				foreach ( $fields as $key => $field ) {
					$field_html  = '<p class="comment-form-' . esc_attr( $key ) . '">';
					$field_html .= '<label for="' . esc_attr( $key ) . '">' . esc_html( $field['label'] );

					if ( $field['required'] ) {
						$field_html .= '&nbsp;<span class="required">*</span>';
					}

					$field_html .= '</label><input id="' . 						esc_attr( $key ) . '" name="' . esc_attr( $key ) . '" type="' . esc_attr( $field['type'] ) . '" value="' . esc_attr( $field['value'] ) . '" size="30" ' . ( $field['required'] ? 'required' : '' ) . ' /></p>';

					$comment_form['fields'][ $key ] = $field_html;
				}

				$account_page_url = wc_get_page_permalink( 'myaccount' );
				if ( $account_page_url ) {
					/* translators: %s opening and closing link tags respectively */
					$comment_form['must_log_in'] = '<p class="must-log-in">' . sprintf( esc_html__( 'You must be %1$slogged in%2$s to post a review.', 'woocommerce' ), '<a href="' . esc_url( $account_page_url ) . '">', '</a>' ) . '</p>';
				}

				if ( wc_review_ratings_enabled() ) {
					$comment_form['comment_field'] = '<div class="comment-form-rating"><label class="reviews-custom-rating" for="rating">' . esc_html__( 'Rating', 'woocommerce' ) . ( wc_review_ratings_required() ? '&nbsp;<span class="required-reviews">*</span>' : '' ) . '</label><div class="star-rating">
						<span class="rating-container">
							<input type="radio" id="star1" name="rating" value="1" required/><label class="star" for="star1" title="' . esc_html__( 'Very poor', 'woocommerce' ) . '"></label>
							<input type="radio" id="star2" name="rating" value="2" required/><label class="star" for="star2" title="' . esc_html__( 'Not that bad', 'woocommerce' ) . '"></label>
							<input type="radio" id="star3" name="rating" value="3" required/><label class="star" for="star3" title="' . esc_html__( 'Average', 'woocommerce' ) . '"></label>
							<input type="radio" id="star4" name="rating" value="4" required/><label class="star" for="star4" title="' . esc_html__( 'Good', 'woocommerce' ) . '"></label>
							<input type="radio" id="star5" name="rating" value="5" required/><label class="star" for="star5" title="' . esc_html__( 'Perfect', 'woocommerce' ) . '"></label>
						</span>
					</div></div>';
				}

				$comment_form['comment_field'] .= '<p class="comment-form-comment"><label class="pcf-field-container-label" for="comment">' . esc_html__( 'Your review', 'woocommerce' ) . '&nbsp;<span class="required">*</span></label><textarea class="reviews-textarea-custom" id="comment" name="comment" cols="45" rows="8" placeholder="Review Comment" required></textarea></p>';

				comment_form( apply_filters( 'woocommerce_product_review_comment_form_args', $comment_form ) );
				?>
			</div>
			<img src="<?php bloginfo('template_url'); ?>/src/img/single-product/photo-reviews.png" alt="" class="reviews-custom-image">

		</div>
	<?php else : ?>
		<p class="woocommerce-verification-required"><?php esc_html_e( 'Only logged in customers who have purchased this product may leave a review.', 'woocommerce' ); ?></p>
	<?php endif; ?>

	<div class="clear"></div>
</div>

