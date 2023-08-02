<footer class="footer">
		<div class="container">
			<div class="footer__main">
				<div class="footer__logo">
					<div class="footer__image">
						<img src="<?php bloginfo('template_url'); ?>/src/img/logo.svg" alt="logo" class="footer__image-desktop">
						<img src="<?php bloginfo('template_url'); ?>/src/img/logo-mobile.svg" alt="logo" class="footer__image-mobile">
						<h1>Boost My Socials</h1>
					</div>

					<div class="footer__text">
						<p>support@boostmysocials.ae</p>
					</div>
				</div>

				<div class="footer__second-block">
						<div class="footer__links">
							<h2>Pages</h2>
							<?php
								if (has_nav_menu('footer-menu')) {
									wp_nav_menu(array(
										'theme_location' => 'footer-menu',
										'menu_class' => 'footer-menu',
										'container' => false,
									));
								}
							?>
						</div>
	
						<div class="footer__links1">
							<h2>Social</h2>
	
							<div class="footer__links1-icon">
								<img src="<?php bloginfo('template_url'); ?>/src/img/footer/footer-telegram.svg" alt="telegram">
								<a href="https://web.telegram.org"><h4>Telegram</h4></a>
							</div>
	
							<div class="footer__links1-icon" id="footer__links1-icon-new"> 
								<img src="<?php bloginfo('template_url'); ?>/src/img/footer/footer-whatsapp.svg" alt="viber">
								<a href="https://www.whatsapp.com/"><h4>WhatsApp</h4></a>
							</div>
	
							<div class="footer__links1-icon" id="footer__links1-icon-new">
								<img src="<?php bloginfo('template_url'); ?>/src/img/footer/footer-instagram.svg" alt="instagram">
								<a href="https://www.instagram.com"><h4>Instagram</h4></a>
							</div>
	
							<div class="footer__links1-icon" id="footer__links1-icon-new">
								<img src="<?php bloginfo('template_url'); ?>/src/img/footer/footer-facebook.svg" alt="facebook">
								<a href="https://www.facebook.com"><h4>Facebook</h4></a>
							</div>
	
							<div class="footer__links1-icon" id="footer__links1-icon-new">
								<img src="<?php bloginfo('template_url'); ?>/src/img/footer/footer-twitter.svg" alt="twitter">
								<a href="https://twitter.com"><h4>Twitter</h4></a>
							</div>
	
						</div>
					</div>

				<div class="footer__links-mobile">
					<div class="footer__links3">
						<h2>Pages</h2>
						<a href="">Our services</a>
						<a href="">About Us</a>
						<a href="">News</a>
						<a href="">Contact</a>
						<a href="">Terms & Conditions</a>
						<a href="">Cookie Policy</a>
						<a href="">Privacy Policy</a>
					</div>

					<div class="footer__links4">
						<h2>Social</h2>
						<div class="block-mobile-footer">
							<img src="<?php bloginfo('template_url'); ?>/src/img/footer/footer-telegram.svg" alt="telegram">
							<a href="https://web.telegram.org"><h4>Telegram</h4></a>
						</div>

						<div class="block-mobile-footer">
							<img src="<?php bloginfo('template_url'); ?>/src/img/footer/footer-whatsapp.svg" alt="viber">
							<a href="https://www.whatsapp.com/"><h4>WhatsApp</h4></a>
						</div>

						<div class="block-mobile-footer">
							<img src="<?php bloginfo('template_url'); ?>/src/img/footer/footer-instagram.svg" alt="instagram">
							<a href="https://www.instagram.com"><h4>Instagram</h4></a>
						</div>

						<div class="block-mobile-footer">
							<img src="<?php bloginfo('template_url'); ?>/src/img/footer/footer-facebook.svg" alt="facebook">
							<a href="https://www.facebook.com"><h4>Facebook</h4></a>
						</div>

						<div class="block-mobile-footer">
							<img src="<?php bloginfo('template_url'); ?>/src/img/footer/footer-twitter.svg" alt="twitter">
							<a href="https://twitter.com"><h4>Twitter</h4></a>
						</div>

					</div>
				</div>

			</div>

			<hr class="footer__line">

			<div class="footer__foot">
				<p>© 2023 | Boost My Social</p>
			</div>
		</div>

	</footer>

	<?php wp_footer(); ?>

	</body>

	</html>