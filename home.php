<?php
/*
Template Name: home

*/
?>
<?php get_header(); ?>

<?php 
    /* How it work? - Block */
	$step1 = get_field('step1');
	$step2 = get_field('step2');
	$step3 = get_field('step3');
?>
<div class="first__button-mobile"><p>Here you will see our newest information</p></div>

    <div class="first">
        <div class="container">
            <div class="first__button" data-aos="fade-right"><p class="first__button-text1"><?= get_field("running-line"); ?> </p></div>

            <div class="first__main" data-aos="fade-right">
                    <h1><span>Buy Followers, Likes and Views</span> for Your Social Media</h1>

                    <div class="first__button-get">
                        <div class="first__get">
                            <select name="platform" id="platform-custom-select" class="platform-custom-select1" data-select2-options='{"minimumResultsForSearch": "Infinity"}'>
                                <option value="">Platform</option>
                                <option value="platform1">Facebook</option>
                                <option value="platform2">Instagram</option>
                                <option value="platform3">YouTube</option>
                                <option value="platform4">Twitter</option>
                                <option value="platform5">TikTok</option>
                                <option value="platform6">Linkedin</option>
                            </select>
                            <img src="<?php bloginfo('template_url'); ?>/src/img/phon/icon.svg" alt="icon">
                        </div>

                        <img src="<?php bloginfo('template_url'); ?>/src/img/phon/line.svg" alt="line">

                        <div class="first__get1">
                            <select placeholder="Category" name="category" id="category-custom-select" class="category-custom-select1" data-select2-options='{"minimumResultsForSearch": "Infinity"}'>						
                                <!-- Пустой список опций, который будет обновляться -->
                                <span class="select-value">Default Value</span>
                            </select>
                            <img src="<?php bloginfo('template_url'); ?>/src/img/phon/icon.svg" alt="icon">
                        </div>

                        <button class="first__get-button">Get started</button>
                    </div>
            </div>

            <div class="first__main-mobile">
                <h1><span>Buy Followers, Likes<br /> and Views</span> for Your <br />Social Media</h1>

                <div class="first__button-get-mobile">

                    <div class="first__get-mobile">
                            <select name="platform" id="platform-custom-select-mob" class="platform-custom-select-mob" data-select2-options='{"minimumResultsForSearch": "Infinity"}'>
                                <option value="">Platform</option>
                                <option value="platform1">Facebook</option>
                                <option value="platform2">Instagram</option>
                                <option value="platform3">YouTube</option>
                                <option value="platform4">Twitter</option>
                                <option value="platform5">TikTok</option>
                                <option value="platform6">Linkedin</option>
                            </select>
                        <img src="<?php bloginfo('template_url'); ?>/src/img/icon-mobile.svg" alt="icon">
                    </div>

                    <hr class="first__line-mobile">

                    <div class="first__get-mobile1">
                            <select placeholder="Category" name="category" id="category-custom-select-mob" class="category-custom-select-mob" data-select2-options='{"minimumResultsForSearch": "Infinity"}'>
                                <!-- Пустой список опций, который будет обновляться -->
                                <option value="">Category</option>
                            </select>
                        <img src="<?php bloginfo('template_url'); ?>/src/img/icon-mobile.svg" alt="icon">
                    </div>

                    <hr class="first__line-mobile">

                    <button class="first__get-button-mobile">Get started</button>
                </div>
            </div>

        </div>
    </div>
<main>
	

    <div class="work">
        <div class="container">
            <h1>How it works? Easy!</h1>

            <div class="work__main">
                <img src="<?php bloginfo('template_url'); ?>/src/img/new1/photo.png" alt="work" class="work__firstimg">

                <div class="work__steps">
                    

                    <div class="work__step2">
                        <img src="<?php bloginfo('template_url'); ?>/src/img/new1/Group-155.svg" alt="ellipsestep" class="work__ellipsestep">
                    </div>

                    <div class="work__step3">
                        <p class="work__text2"><?php echo $step1; ?></p>
                        <p class="work__text2"><?php echo $step2; ?></p>
                        <p class="work__text2"><?php echo $step3; ?></p>
						<p class="work__text-new">
							Based on our terms & services
						</p>
                    </div>
                </div>
            </div>

            <div class="work__main-mobile">
                <img src="<?php bloginfo('template_url'); ?>/src/img/photo-work-mobile.png" alt="work">

                <div class="work__steps-mobile">
                    <img src="<?php bloginfo('template_url'); ?>/src/img/new1/Group-155.svg" alt="work-line">

                    <div class="work__step1-mobile">
                        <p>Select the Platform and Service.</p>
                        <p>Place your order.</p>
                        <p>Receive your Confirmation and Service</p>
						<p class="work__text-new">
							Based on our terms & services
						</p>
                    </div>

                </div>
            </div>

        </div>
    </div>

    <div class="services" id="services-page">
        <div class="container">
            <h1>Our services</h1>
            

            <div class="swiper services-slider" data-aos="slide-right">
                <div class="swiper-button-prev">
                    <img src="<?php bloginfo('template_url'); ?>/src/img/left.svg" alt="left">
                </div>

                <div class="swiper-wrapper">

                    <div class="swiper-slide services-slide">

                        <div class="services__items">

                            <div class="services__item">
                                <div class="services__item1">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/icon-instagram.svg" alt="">
                                    <h2>Instagram</h2>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/people.svg" alt="">
                                    <p>Followers</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/like.svg" alt="">
                                    <p>Auto Likes</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/comment.svg" alt="">
                                    <p>Comments</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/pack.svg" alt="">
                                    <p>Packages</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/view.svg" alt="">
                                    <p>Vide Views</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/story.svg" alt="">
                                    <p>Story Views</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/glaz.svg" alt="">
                                    <p>Views</p>
                                </div>

                                <a href="/store/?filter_products=instagram">
                                    <button class="services__button-item">Buy now</button>
                                </a>
                            </div>

                            <div class="services__item">
                                <div class="services__item1">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/icon-facebook.svg" alt="">
                                    <h2>Facebook</h2>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/glaz.svg" alt="">
                                    <p>Video Views</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/like.svg" alt="">
                                    <p>Likes</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/people.svg" alt="">
                                    <p>Followers</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/comment.svg" alt="">
                                    <p>Comments</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/friend.svg" alt="">
                                    <p>Friends</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/view.svg" alt="">
                                    <p>Group Joins</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/emotion.svg" alt="">
                                    <p>Emotion Post Likes</p>
                                </div>
                                

                                <a href="/store/?filter_products=facebook" id="your-button-id">
                                    <button class="services__button-item2">Buy now</button>
                                </a>

                            </div>

                            <div class="services__item">
                                <div class="services__item1">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/icon-youtube.svg" alt="">
                                    <h2>Youtube</h2>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/glaz.svg" alt="">
                                    <p>Views</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/people.svg" alt="">
                                    <p>Subscribers</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/like.svg" alt="">
                                    <p>Likes</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/dislike.svg" alt="">
                                    <p>Dislikes</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/comment.svg" alt="">
                                    <p>Comments</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/like.svg" alt="">
                                    <p>Comment Likes</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/share.svg" alt="">
                                    <p>Reshare</p>
                                </div>

                                <a href="/store/?filter_products=youtube">
                                    <button class="services__button-item">Buy now</button>
                                </a>

                            </div>

                        </div>

                    </div>

                    <div class="swiper-slide services-slide">

                        <div class="services__items">

                            <div class="services__item" id="services__item-linkedin-new">
                                <div class="services__item1">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/new-services/icon-tiktok.svg" alt="">
                                    <h2>Tik Tok</h2>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/glaz.svg" alt="">
                                    <p>Views</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/people.svg" alt="">
                                    <p>Followers</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/like.svg" alt="">
                                    <p>Auto Likes</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/share.svg" alt="">
                                    <p>Reshare</p>
                                </div>
                                <a href="/store/?filter_products=tik-tok">
                                    <button class="services__button-item">Buy now</button>
                                </a>

                            </div>

                            <div class="services__item" id="services__item-linkedin-new">
                                <div class="services__item1">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/new-services/icon-twitter.svg" alt="">
                                    <h2>Twitter</h2>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/people.svg" alt="">
                                    <p>Followers</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/like.svg" alt="">
                                    <p>Favorite/Likes</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/comment.svg" alt="">
                                    <p>Comments</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/new-services/icon-retwit.svg" alt="">
                                    <p>Re-tweets</p>
                                </div>
                                <a href="/store/?filter_products=twitter">
                                    <button class="services__button-item2">Buy now</button>
                                </a>
                                
                            </div>

                            <div class="services__item" id="services__item-linkedin-new">
                                <div class="services__item1">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/new-services/icon-linkedin.svg" alt="">
                                    <h2>Linkedin</h2>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/people.svg" alt="">
                                    <p>Accounts</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/new-services/icon-skill.svg" alt="">
                                    <p>Endorsements</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/share.svg" alt="">
                                    <p>Shares</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/services/people.svg" alt="">
                                    <p>Followers</p>
                                </div>
                                <div class="services__item2">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/new-services/icon-connections.svg" alt="">
                                    <p>Connections</p>
                                </div>
                                <a href="/store/?filter_products=linkedin">
                                    <button class="services__button-item">Buy now</button>
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

                <div class="swiper-button-next">
                    <img src="<?php bloginfo('template_url'); ?>/src/img/right.svg" alt="right">
                </div>
            </div>

            <div class="swiper services-slider-mobile">
                <div class="swiper-wrapper">
                    <div class="swiper-slide services-slide-mobile">
                        <div class="services__item">
                            <div class="services__item1">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/icon-instagram.svg" alt="">
                                <h2>Instagram</h2>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/people.svg" alt="" class="services__img-mobile ">
                                <p>Followers</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/like.svg" alt="" class="services__img-mobile ">
                                <p>Auto Likes</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/comment.svg" alt="" class="services__img-mobile ">
                                <p>Comments</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/pack.svg" alt="" class="services__img-mobile ">
                                <p>Packages</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/view.svg" alt="" class="services__img-mobile ">
                                <p>Vide Views</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/story.svg" alt="" class="services__img-mobile ">
                                <p>Story Views</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/glaz.svg" alt="" class="services__img-mobile ">
                                <p>Views</p>
                            </div>

                            <a href="https://boostmysocials.ae/store/?filter_products=instagram">
                                <button class="services-button-mobile">Buy now</button>
                            </a>
                        </div>
                    </div>

                    <div class="swiper-slide services-slide-mobile">
                        <div class="services__item facebook">
                            <div class="services__item1">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/icon-facebook.svg" alt="">
                                <h2>Facebook</h2>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/glaz.svg" alt="" class="services__img-mobile ">
                                <p>Video Views</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/like.svg" alt="" class="services__img-mobile ">
                                <p>Likes</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/people.svg" alt="" class="services__img-mobile ">
                                <p>Followers</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/comment.svg" alt="" class="services__img-mobile ">
                                <p>Comments</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/view.svg" alt="" class="services__img-mobile ">
                                <p>Group Joins</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/event.svg" alt="" class="services__img-mobile ">
                                <p>Events</p>
                            </div>

                            <a href="https://boostmysocials.ae/store/?filter_products=facebook">
                                <button class="services-button-mobile2">Buy now</button>
                            </a>
                        </div>
                    </div>

                    <div class="swiper-slide services-slide-mobile">
                        <div class="services__item">
                            <div class="services__item1">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/icon-youtube.svg" alt="">
                                <h2>Youtube</h2>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/glaz.svg" alt="" class="services__img-mobile ">
                                <p>Views</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/people.svg" alt="" class="services__img-mobile ">
                                <p>Subscribers</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/like.svg" alt="" class="services__img-mobile ">
                                <p>Likes</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/dislike.svg" alt="" class="services__img-mobile ">
                                <p>Dislikes</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/comment.svg" alt="" class="services__img-mobile ">
                                <p>Comments</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/like.svg" alt="" class="services__img-mobile ">
                                <p>Comment Likes</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/share.svg" alt="" class="services__img-mobile ">
                                <p>Reshare</p>
                            </div>

                            <a href="https://boostmysocials.ae/store/?filter_products=youtube">
                                <button class="services-button-mobile">Buy now</button>
                            </a>
                        </div>
                    </div>

                    <div class="swiper-slide services-slide-mobile">
                        <div class="services__item" id="services-linkedin">
                            <div class="services__item1">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/new-services/icon-linkedin.svg" alt="">
                                <h2>Linkedin</h2>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/people.svg" alt="" class="services__img-mobile ">
                                <p>Accounts</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/new-services/icon-skill.svg" alt="" class="services__img-mobile ">
                                <p>Endorsements</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/share.svg" alt="" class="services__img-mobile ">
                                <p>Shares</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/people.svg" alt="" class="services__img-mobile ">
                                <p>Followers</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/new-services/icon-connections.svg" alt="" class="services__img-mobile ">
                                <p>Connections</p>
                            </div>

                            <a href="https://boostmysocials.ae/store/?filter_products=linkedin" id="services-button-social">
                                <button class="services-button-mobile">Buy now</button>
                            </a>
                        </div>
                    </div>

                    <div class="swiper-slide services-slide-mobile">
                        <div class="services__item" id="services-twitter">
                            <div class="services__item1">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/new-services/icon-twitter.svg" alt="">
                                <h2>Twitter</h2>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/people.svg" alt="" class="services__img-mobile ">
                                <p>Followers</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/like.svg" alt="" class="services__img-mobile ">
                                <p>Favorite/Likes</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/comment.svg" alt="" class="services__img-mobile ">
                                <p>Comments</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/new-services/icon-retwit.svg" alt="" class="services__img-mobile ">
                                <p>Re-tweets</p>
                            </div>
                            

                            <a href="https://boostmysocials.ae/store/?filter_products=twitter" id="services-button-social">
                                <button class="services-button-mobile">Buy now</button>
                            </a>
                        </div>
                    </div>

                    <div class="swiper-slide services-slide-mobile">
                        <div class="services__item" id="services-tik-tok">
                            <div class="services__item1">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/new-services/icon-tiktok.svg" alt="">
                                <h2>Tik Tok</h2>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/glaz.svg" alt="" class="services__img-mobile ">
                                <p>Views</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/people.svg" alt="" class="services__img-mobile ">
                                <p>Followers</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/like.svg" alt="" class="services__img-mobile ">
                                <p>Auto Likes</p>
                            </div>
                            <div class="services__item2">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/share.svg" alt="" class="services__img-mobile ">
                                <p>Reshare</p>
                            </div>

                            <a href="https://boostmysocials.ae/store/?filter_products=tik-tok" id="services-button-social">
                                <button class="services-button-mobile">Buy now</button>
                            </a>
                        </div>
                    </div>

                </div>

                <div class="swiper-pagination"></div>
            </div>
            
        </div>
    </div>

    <div class="accordion">
        <div class="container">
            <h1>Buy Followers, Likes and Views for Your Social Media</h1>

            <div class="accordion__main">

                <div class="accordion__first">
                    <img src="<?php bloginfo('template_url'); ?>/src/img/accordion.png" alt="accordion">

                    <div class="accordion__first-new-style">
                        <p><?= get_field("text-first"); ?></p>

                        <p class="accordion__p2"><?= get_field("text-second"); ?></p>
                    </div>

                </div>


                <div class="accordion__buttons">

                    <div class="accordion__buttons-mobile">
                        <button class="accordion__button">About</button>
                        <div class="accordion__panel">
                            <div class="panel-mobile">
                            <p class="accordion__panelp">Our business is a leading supplier of social media engagement services, assisting organizations and people to broaden their social media presence. We provide a variety of services, including as likes, followers, and views, that are aimed at assisting our customers in staying one step ahead of the competition and achieving their social media objectives.

                            </p>
                            
                            <p>Our team of skilled specialists has a thorough awareness of the social media landscape as well as the methods and approaches required to prevail in this cutthroat field. We take great satisfaction in offering premium services that are customized to meet the specific requirements and objectives of each of our clients. Since we firmly believe that the success of our clients directly impacts our own, we are dedicated to offering them the highest caliber of customer care possible.</p>
                            </div>
                        </div>
                    </div>

                    <div>

                        <button class="accordion__button"><?= get_field("button-first"); ?></button>
                        <div class="accordion__panel">
                            <p class="accordion__panelp"><?= get_field("button-first-text1"); ?>
                            </p>
    
                            <hr class="accordion__line1">
    
                            <div class="accordion__panel1">
                                <p class="accordion__panelp"><?= get_field("button-first-text2"); ?>
                                </p>
                                
                                <img src="<?php bloginfo('template_url'); ?>/src/img/lineacc.svg" alt="line" class="accordion__lineimg">
                                <hr class="accordion__line11">
    
                                <p class="accordion__panelp"><?= get_field("button-first-text3"); ?>
                                </p>
                            </div>
                        </div>
                    </div>
    
                    <div>
                        <button class="accordion__button"><?= get_field("button-second"); ?></button>
                        <div class="accordion__panel">
                            <p class="accordion__panelp"><?= get_field("button-second-text1"); ?>
                            </p>

                            <hr class="accordion__line1">
    
                            <div class="accordion__panel2">
                                <p class="accordion__panelp"><?= get_field("button-second-text2"); ?>
                                    </p>

                                <img src="<?php bloginfo('template_url'); ?>/src/img/lineacc.svg" alt="line" class="accordion__lineimg">
                                <hr class="accordion__line11">

                                <p class="accordion__panelp"><?= get_field("button-second-text3"); ?>
                                    </p>
                            </div>
                        </div>
                    </div>
    
                    <div>
                        <button class="accordion__button"><?= get_field("button-third"); ?></button>
                        <div class="accordion__panel">
                            <p class="accordion__panelp"><?= get_field("button-third-text1"); ?>
                            </p>
    
                            <hr class="accordion__line1">

                            <div class="accordion__panel3">
                                <p class="accordion__panelp"><?= get_field("button-third-text2"); ?>
                                    </p>
                                <img src="<?php bloginfo('template_url'); ?>/src/img/lineacc.svg" alt="line" class="accordion__lineimg">
                                <hr class="accordion__line11">

                                <p class="accordion__panelp"><?= get_field("button-third-text3"); ?></p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>

    <div class="pay">
        <div class="container">
            <h1>Our Payment Systems</h1>

            <div class="swiper pay-slider" data-aos="fade-right">
                <div class="swiper-button-prev" id="button-next-pay">
                    <img src="<?php bloginfo('template_url'); ?>/src/img/left.svg" alt="left" class="pay-img-next">
                </div>

                <div class="swiper-wrapper">
                    <div class="swiper-slide pay-slide">
                        <div class="pay__item">
                            <img src="<?php bloginfo('template_url'); ?>/src/img/new1/pay.png" alt="paypal" class="pay-img-pay">
                            <p>With the help of PayPal, customers may send and receive money online safely and conveniently. PayPal is a practical choice for people and companies wishing to conduct online transactions because of its user-friendly design, quick processing times, and dependable customer care. In addition, PayPal provides a number of tools and services like reporting, integration with other accounting software, and invoicing to assist users in managing their funds. In general, PayPal is a reliable and effective payment method used by individuals all over the world.</p>
                        </div>

                        <div class="pay__item">
                            <img src="<?php bloginfo('template_url'); ?>/src/img/new1/stripe.png" alt="stripe" class="pay-img-stripe">
                            <p class="pay__stripe-text">Businesses can accept payments securely and easily thanks to Stripe, a popular online payment processing platform. Businesses can accept payments via numerous methods, such as credit and debit cards, bank transfers, and mobile payments, using Stripe. A number of capabilities are available from Stripe, including as support for different currencies, subscription management, and fraud detection. Additionally, it interfaces with a wide range of other platforms and programs, making it a flexible and practical choice for companies of all kinds. In conclusion, Stripe is a trustworthy and effective payment processing service that may assist companies in streamlining their operations and enhancing their bottom line.</p>
                        </div>
                    </div>

                    <div class="swiper-slide pay-slide">
                        <div class="pay__item">
                            <img src="<?php bloginfo('template_url'); ?>/src/img/new1/pay.png" alt="paypal" class="pay-img-pay">
                            <p>With the help of PayPal, customers may send and receive money online safely and conveniently. PayPal is a practical choice for people and companies wishing to conduct online transactions because of its user-friendly design, quick processing times, and dependable customer care. In addition, PayPal provides a number of tools and services like reporting, integration with other accounting software, and invoicing to assist users in managing their funds. In general, PayPal is a reliable and effective payment method used by individuals all over the world.</p>
                        </div>

                        <div class="pay__item">
                            <img src="<?php bloginfo('template_url'); ?>/src/img/new1/stripe.png" alt="stripe" class="pay-img-stripe">
                            <p class="pay__stripe-text">Businesses can accept payments securely and easily thanks to Stripe, a popular online payment processing platform. Businesses can accept payments via numerous methods, such as credit and debit cards, bank transfers, and mobile payments, using Stripe. A number of capabilities are available from Stripe, including as support for different currencies, subscription management, and fraud detection. Additionally, it interfaces with a wide range of other platforms and programs, making it a flexible and practical choice for companies of all kinds. In conclusion, Stripe is a trustworthy and effective payment processing service that may assist companies in streamlining their operations and enhancing their bottom line.</p>
                        </div>
                    </div>
                </div>

                <div class="swiper-button-next" id="button-next-pay">
                    <img src="<?php bloginfo('template_url'); ?>/src/img/right.svg" alt="right" class="pay-img-next">
                </div>

            </div>

            <div class="swiper pay-slider-mobile">
                <div class="swiper-wrapper">
                    <div class="swiper-slide pay-slide-mobile">

                        <div class="pay-item-mobile">
                            <img src="<?php bloginfo('template_url'); ?>/src/img/new1/pay.png" alt="paypal">
                            <p>With the help of PayPal, customers may send and receive money online safely and conveniently. PayPal is a practical choice for people and companies wishing to conduct online transactions because of its user-friendly design, quick processing times, and dependable customer care. In addition, PayPal provides a number of tools and services like reporting, integration with other accounting software, and invoicing to assist users in managing their funds. In general, PayPal is a reliable and effective payment method used by individuals all over the world.</p>
                        </div>

                    </div>

                    <div class="swiper-slide pay-slide-mobile">

                        <div class="pay-item-mobile">
                            <img class="pay-item__stripe-img" src="<?php bloginfo('template_url'); ?>/src/img/new1/stripe.png" alt="paypal">
                            <p>With the help of PayPal, customers may send and receive money online safely and conveniently. PayPal is a practical choice for people and companies wishing to conduct online transactions because of its user-friendly design, quick processing times, and dependable customer care. In addition, PayPal provides a number of tools and services like reporting, integration with other accounting software, and invoicing to assist users in managing their funds. In general, PayPal is a reliable and effective payment method used by individuals all over the world.</p>
                        </div>

                    </div>

                    <div class="swiper-slide pay-slide-mobile">

                        <div class="pay-item-mobile">
                            <img src="<?php bloginfo('template_url'); ?>/src/img/new1/pay.png" alt="paypal">
                            <p>With the help of PayPal, customers may send and receive money online safely and conveniently. PayPal is a practical choice for people and companies wishing to conduct online transactions because of its user-friendly design, quick processing times, and dependable customer care. In addition, PayPal provides a number of tools and services like reporting, integration with other accounting software, and invoicing to assist users in managing their funds. In general, PayPal is a reliable and effective payment method used by individuals all over the world.</p>
                        </div>

                    </div>

                    <div class="swiper-slide pay-slide-mobile">

                        <div class="pay-item-mobile">
                            <img class="pay-item__stripe-img" src="<?php bloginfo('template_url'); ?>/src/img/new1/stripe.png" alt="paypal">
                            <p>With the help of PayPal, customers may send and receive money online safely and conveniently. PayPal is a practical choice for people and companies wishing to conduct online transactions because of its user-friendly design, quick processing times, and dependable customer care. In addition, PayPal provides a number of tools and services like reporting, integration with other accounting software, and invoicing to assist users in managing their funds. In general, PayPal is a reliable and effective payment method used by individuals all over the world.</p>
                        </div>

                    </div>
                </div>

                <div class="swiper-pagination"></div>
            </div>
        </div>
    </div>

    <div class="media">
        <div class="container">
            <h1>Social Media Activity Price</h1>

            <div class="media__main">
                <div class="media__first">

                    <div class="media__insta">

                        <div class="media__insta1">
                            <img src="<?php bloginfo('template_url'); ?>/src/img/instagram.svg" alt="instagram">
                            <h2>Instagram</h2>
                        </div>

                        <div class="media__insta2">
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Followers - from $0.50</p>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Likes - from $0.50</p>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Video Views - from $0.50</p>
                            </div>
                            <a href="/store/?filter_products=instagram">
                                    <button class="services__button-item">Buy now</button>
                            </a>
                        </div>

                    </div>

                    <div class="media__facebook">

                        <div class="media__facebook1">
                            <img src="<?php bloginfo('template_url'); ?>/src/img/facebook.svg" alt="facebook">
                            <h2>Facebook</h2>
                        </div>

                        <div class="media__facebook2">
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Followers - from $0.50</p>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Likes - from $0.50</p>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Video Views - from $0.50</p>
                            </div>
                            <a href="/store/?filter_products=facebook">
                                    <button class="services__button-item">Buy now</button>
                            </a>
                        </div>

                    </div>

                    <div class="media__tiktok">

                        <div class="media__tiktok1">
                            <img src="<?php bloginfo('template_url'); ?>/src/img/tiktok.svg" alt="tiktok">
                            <h2>Tik Tok</h2>
                        </div>

                        <div class="media__tiktok2">
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Followers - from $0.50</p>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Likes - from $0.50</p>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Video Views - from $0.50</p>
                            </div>
                            <a href="/store/?filter_products=tik-tok">
                                    <button class="services__button-item">Buy now</button>
                            </a>
                        </div>

                    </div>

                </div>

                <div class="media__second">

                    <div class="media__twitter">

                        <div class="media__twitter1">
                            <img src="<?php bloginfo('template_url'); ?>/src/img/twitter.svg" alt="twitter">
                            <h2>Twitter</h2>
                        </div>

                        <div class="media__twitter2">
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Followers - from $0.50</p>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Likes - from $0.50</p>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Video Views - from $0.50</p>
                            </div>
                            <a href="/store/?filter_products=twitter">
                                    <button class="services__button-item">Buy now</button>
                            </a>
                        </div>

                    </div>

                    <div class="media__youtube">

                        <div class="media__youtube1">
                            <img src="<?php bloginfo('template_url'); ?>/src/img/youtube.svg" alt="youtube">
                            <h2>YouTube</h2>
                        </div>

                        <div class="media__youtube2">
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Followers - from $0.50</p>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Likes - from $0.50</p>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Video Views - from $0.50</p>
                            </div>
                            <a href="/store/?filter_products=youtube">
                                    <button class="services__button-item">Buy now</button>
                            </a>
                        </div>

                    </div>

                    <div class="media__linkedin">

                        <div class="media__linkedin1">
                            <img src="<?php bloginfo('template_url'); ?>/src/img/linkedin.svg" alt="tiktok">
                            <h2>LinkedIn</h2>
                        </div>

                        <div class="media__linkedin2">
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Followers - from $0.50</p>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Likes - from $0.50</p>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/ellipse.svg" alt="ellipse" class="media__ellipse">
                                <p>Video Views - from $0.50</p>
                            </div>
                            <a href="/store/?filter_products=linkedin">
                                    <button class="services__button-item">Buy now</button>
                            </a>
                        </div>

                    </div>

                </div>
            </div>

            <div class="swiper media-slider-mobile">
                <div class="swiper-wrapper">

                    <div class="swiper-slide media-slide-mobile">
                        <div class="media-items-mobile">
                            <div class="media-item1-mobile">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/insta-mobile.svg" alt="instagram">
                                <h3>Instagram</h3>
                            </div>
                            
                            <div class="media-item">
                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Followers - from $0.50</p>
                                </div>

                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Likes - from $0.50</p>
                                </div>

                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Video Views - from $0.50 </p>
                                </div>
								<a href="https://boostmysocials.ae/store/?filter_products=instagram">
									<button class="services-button-mobile">Buy now</button>
								</a>
                            </div>

                        </div>
                    </div>

                    <div class="swiper-slide media-slide-mobile">
                        <div class="media-items-mobile">
                            <div class="media-item1-mobile">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/icon-facebook.svg" alt="instagram">
                                <h3>Facebook</h3>
                            </div>
                            
                            <div class="media-item">
                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Followers - from $0.50</p>
                                </div>

                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Likes - from $0.50</p>
                                </div>

                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Video Views - from $0.50 </p>
                                </div>
                                <a href="https://boostmysocials.ae/store/?filter_products=facebook">
									<button class="services-button-mobile">Buy now</button>
								</a>
                            </div>

                        </div>
                    </div>

                    <div class="swiper-slide media-slide-mobile">
                        <div class="media-items-mobile">
                            <div class="media-item1-mobile">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/services/icon-youtube.svg" alt="instagram">
                                <h3>Youtube</h3>
                            </div>
                            
                            <div class="media-item">
                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Followers - from $0.50</p>
                                </div>

                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Likes - from $0.50</p>
                                </div>

                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Video Views - from $0.50 </p>
                                </div>
								<a href="https://boostmysocials.ae/store/?filter_products=youtube">
									<button class="services-button-mobile">Buy now</button>
								</a>
                            </div>

                        </div>
                    </div>

                    <div class="swiper-slide media-slide-mobile">
                        <div class="media-items-mobile">
                            <div class="media-item1-mobile">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/new-services/icon-tiktok.svg" alt="instagram">
                                <h3>Tik Tok</h3>
                            </div>
                            
                            <div class="media-item">
                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Followers - from $0.50</p>
                                </div>

                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Likes - from $0.50</p>
                                </div>

                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Video Views - from $0.50 </p>
                                </div>
                                <a href="https://boostmysocials.ae/store/?filter_products=tik-tok">
									<button class="services-button-mobile">Buy now</button>
								</a>
                            </div>

                        </div>
                    </div>

                    <div class="swiper-slide media-slide-mobile">
                        <div class="media-items-mobile">
                            <div class="media-item1-mobile">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/linkedin.svg" alt="instagram">
                                <h3>Linkedin</h3>
                            </div>
                            
                            <div class="media-item">
                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Followers - from $0.50</p>
                                </div>

                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Likes - from $0.50</p>
                                </div>

                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Video Views - from $0.50 </p>
                                </div>
                                <a href="https://boostmysocials.ae/store/?filter_products=linkedin">
									<button class="services-button-mobile">Buy now</button>
								</a>
                            </div>

                        </div>
                    </div>

                    <div class="swiper-slide media-slide-mobile">
                        <div class="media-items-mobile">
                            <div class="media-item1-mobile">
                                <img src="<?php bloginfo('template_url'); ?>/src/img/twitter.svg" alt="instagram">
                                <h3>Twitter</h3>
                            </div>
                            
                            <div class="media-item">
                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Followers - from $0.50</p>
                                </div>

                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Likes - from $0.50</p>
                                </div>

                                <div class="media-item2-mobile">
                                    <img src="<?php bloginfo('template_url'); ?>/src/img/eclipse-mobile.svg" alt="">
                                    <p>Video Views - from $0.50 </p>
                                </div>
                                <a href="https://boostmysocials.ae/store/?filter_products=twitter">
									<button class="services-button-mobile">Buy now</button>
								</a>
                            </div>
                            
                        </div>
                    </div>

                </div>

                <div class="swiper-pagination">
                </div>
                
            </div>

        </div>
    </div>

    <div class="news">
        <div class="container">
            <h1>News</h1>
            
            <div class="swiper news-slider" >
    <div class="swiper-button-prev" id="button-prev-news">
        <img src="<?php bloginfo('template_url'); ?>/src/img/left.svg" alt="left">
    </div>

	<div class="swiper-wrapper">
    <?php
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => 18, // Количество выводимых статей
        'orderby' => 'date',
        'order' => 'DESC'
    );
    $query = new WP_Query($args);

    if ($query->have_posts()) :
        $i = 0; // Счетчик для контроля вывода статей
        while ($query->have_posts()) : $query->the_post();
            if ($i % 3 == 0) {
                // Начало нового слайда каждые 3 статьи
                echo '<div class="swiper-slide news-slide">';
            }
    ?>
            <div class="news__item">
                <a href="<?php the_permalink(); ?>" class="news__link">
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="news__img">
                            <?php the_post_thumbnail('boostmysocials-slider'); ?>
                        </div>
                    <?php endif; ?>
                    <p class="news__p"><?php echo wp_trim_words(get_the_content(), 20, '...'); ?></p>
                </a>
            </div>
    <?php
            if ($i % 3 == 2 || $i == $query->post_count - 1) {
                // Закрытие слайда после каждых 3 статей или в конце цикла
                echo '</div>';
            }
            $i++;
        endwhile;
    endif;
    wp_reset_postdata();
    ?>
</div>

    <div class="swiper-button-next" id="button-prev-news">
        <img src="<?php bloginfo('template_url'); ?>/src/img/right.svg" alt="right">
    </div>
</div>

            <div class="swiper news-slider-mobile">
                <div class="swiper-wrapper">
                    <?php
                    $args = array(
                        'post_type' => 'post',
                        'posts_per_page' => 3,
                        'orderby' => 'date',
                        'order' => 'DESC',
                    );
                    $query = new WP_Query($args);

                    if ($query->have_posts()) {
                        while ($query->have_posts()) {
                            $query->the_post();
                            ?>
                            <div class="swiper-slide news-slide-mobile">
                                <div class="news-item-mobile">
                                    <?php if (has_post_thumbnail()) : ?>
                                        <img src="<?php the_post_thumbnail_url(); ?>" alt="news">
                                    <?php endif; ?>
                                    <p><?php the_title(); ?></p>
                                </div>
                            </div>
                            <?php
                        }
                        wp_reset_postdata();
                    }
                    ?>
                </div>

                <div class="swiper-pagination"></div>
            </div>
            
        </div>
    </div>

    <div class="contact">
        <div class="container">
            <h1 class="contact__h1-main">Contact</h1>

            <div class="contact__main">

                   <div class="contact-form-deskt" id="contact-form-deskt">
                   <?php echo do_shortcode('[contact-form-7 id="9" title="Contact Form"]') ?>
                   <div class="contact__photo">
                        <img src="<?php bloginfo('template_url'); ?>/src/img/contact.png" alt="contact">
                    </div>  
                   </div>                     
                         
                    
                    <div id="success-message" style="display: none;">
                        <svg width="139" height="138" viewBox="0 0 139 138" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M69.5087 136.584C107.093 136.584 137.56 106.318 137.56 68.9823C137.56 31.6471 107.093 1.38086 69.5087 1.38086C31.9248 1.38086 1.45703 31.6471 1.45703 68.9823C1.45703 106.318 31.9248 136.584 69.5087 136.584Z" fill="#E64A19"></path> <path d="M136.106 68.984C136.08 82.7056 131.782 96.151 123.783 107.34C115.784 118.529 104.971 126.587 92.4227 131.126C79.2586 135.895 64.6974 136.428 51.2222 132.619C38.2502 128.949 26.6158 121.305 18.0274 110.984C9.37941 100.578 4.08201 87.5009 3.08213 74.049C2.08224 60.5971 5.3269 46.4744 12.5247 34.6933C19.4709 23.3201 29.8472 14.203 42.0246 8.68413C54.6655 2.96133 69.1605 1.37593 82.7681 4.13209C96.3758 6.88825 108.288 13.5518 117.651 23.2805C127.048 33.0356 133.246 45.5534 135.338 58.8934C135.861 62.2284 136.093 65.6096 136.1 68.984C136.1 70.8324 139 70.839 138.993 68.984C138.967 54.7231 134.504 40.6134 126.147 28.9967C117.983 17.6432 106.481 8.90122 93.2901 4.09933C80.0996 -0.702567 64.4193 -1.38015 50.4474 2.56662C36.4755 6.51338 24.7352 14.3411 15.8422 25.1092C6.94919 35.8773 1.30747 49.5659 0.201644 63.6888C-0.904187 77.8116 2.55901 92.5528 10.0813 104.821C17.3056 116.602 28.1057 126.173 40.7664 131.856C54.1159 137.849 69.187 139.513 83.5429 136.605C97.8988 133.698 110.023 126.771 119.704 116.72C129.385 106.669 136.04 93.5065 138.172 79.6139C138.709 76.0947 138.993 72.5427 139 68.9775C139 67.1291 136.106 67.1225 136.106 68.9775V68.984Z" fill="black"></path> <path d="M133.32 9.42866C127.328 3.96897 118.819 3.99528 112.846 9.42866C97.4636 23.4199 83.7367 39.5425 71.4203 56.211C69.9966 58.1318 68.606 60.0788 67.2353 62.039C63.3219 57.8094 59.2826 53.6982 55.1308 49.6988C49.6877 44.4562 40.0001 43.9168 34.6564 49.6988C29.4186 55.369 28.8491 64.4466 34.6564 70.0379C37.5832 72.8532 40.4305 75.754 43.2447 78.6746C45.7941 81.3255 48.3038 84.0159 50.7538 86.7589C52.1047 88.2719 53.4422 89.8045 54.7467 91.3635C55.3427 92.0739 55.9387 92.7909 56.5214 93.5145C56.8061 93.8697 57.0842 94.2248 57.3689 94.58C57.6206 94.8892 57.5941 94.8498 57.4418 94.6459C60.4282 98.2111 63.9774 100.625 69.0232 100.625C74.069 100.625 79.0353 97.8954 81.525 93.5013C85.4782 86.5221 89.8684 79.7863 94.5632 73.2742C95.636 71.7875 96.722 70.3141 97.8212 68.8472C98.3642 68.1236 98.9137 67.4066 99.4633 66.6896C99.47 66.6765 99.4832 66.6633 99.4898 66.6567C99.6223 66.4923 99.7348 66.3475 99.7812 66.2817C101.986 63.4927 104.244 60.7366 106.542 58.02C113.601 49.6726 121.057 41.6277 128.884 33.9907C130.341 32.5699 131.804 31.149 133.314 29.7742C138.916 24.6828 138.902 14.5331 133.314 9.43524L133.32 9.42866Z" fill="white"></path> <path d="M134.34 8.4156C130.274 4.76484 124.791 3.08093 119.394 4.34389C116.686 4.97537 114.196 6.34362 112.11 8.15913C109.7 10.2509 107.402 12.5071 105.124 14.7371C95.8872 23.7817 87.3252 33.4907 79.2864 43.5944C74.6843 49.3764 70.2081 55.2638 65.9834 61.3221L68.2546 61.0325C65.5728 58.1382 62.8315 55.29 60.0371 52.5009C57.7327 50.2052 55.4879 47.6399 52.5611 46.1072C47.6345 43.5287 41.3042 43.3643 36.5034 46.3375C31.7026 49.3107 28.7891 55.2834 29.0738 60.9076C29.2195 63.7821 30.1267 66.637 31.8351 68.9787C32.8217 70.3338 34.0401 71.4586 35.2387 72.6295C36.6491 74.0174 38.0463 75.4185 39.4302 76.8261C42.463 79.9178 45.4494 83.0555 48.3563 86.259C49.8197 87.8706 51.2699 89.5019 52.6869 91.1595C53.998 92.6922 55.2098 94.3104 56.5342 95.8233C57.6069 97.0468 59.7192 95.4417 58.8054 94.0801C58.7723 94.0275 58.7326 93.9683 58.6862 93.9222L56.415 95.6655C58.9379 98.6453 62.1825 101.099 66.1158 101.796C70.261 102.533 74.6446 101.632 78.1078 99.2372C79.803 98.0598 81.273 96.5996 82.392 94.8696C83.7098 92.8238 84.8421 90.6531 86.1069 88.5744C88.7688 84.2198 91.5897 79.9574 94.5363 75.7869C100.383 67.5251 106.734 59.7959 113.501 52.1918C116.898 48.3766 120.374 44.6403 123.937 40.9764C125.685 39.1872 127.446 37.4113 129.234 35.6615C131.022 33.9118 133.002 32.1686 134.797 30.3465C140.518 24.525 140.319 13.9805 134.333 8.4156C132.976 7.15263 130.923 9.1787 132.287 10.4482C136.902 14.7305 137.399 22.8542 133.32 27.6824C131.903 29.3598 130.115 30.7675 128.546 32.2935C126.817 33.9709 125.109 35.6614 123.42 37.3783C119.977 40.8646 116.613 44.4298 113.329 48.0608C106.899 55.165 100.701 62.4929 95.0197 70.1957C92.126 74.1227 89.3317 78.1287 86.683 82.2202C85.352 84.2725 84.0541 86.3511 82.796 88.4495C81.6571 90.3505 80.6903 92.4686 79.3262 94.2183C76.7768 97.4744 72.6316 99.3227 68.4996 99.178C64.3677 99.0333 61.0701 96.7113 58.4677 93.6328C57.4215 92.3962 55.2098 94.0605 56.1964 95.3761C56.2362 95.4287 56.2759 95.4813 56.3157 95.5339L58.5869 93.7907C56.3024 91.1924 54.1901 88.4494 51.8857 85.8642C49.5814 83.2791 46.9988 80.5099 44.4892 77.8919C41.9796 75.2738 39.4302 72.6755 36.8345 70.143C35.8015 69.13 34.742 68.1696 33.9474 66.9461C33.2455 65.8673 32.729 64.7163 32.3913 63.4796C31.0935 58.6843 32.7952 53.2377 36.4902 49.9159C40.1851 46.594 45.6547 46.2585 50.0581 48.0806C53.0975 49.337 55.2628 51.8038 57.5407 54.0732C60.494 57.0069 63.381 59.9998 66.2085 63.052C66.8839 63.7821 67.9766 63.4862 68.4798 62.7626C75.5849 52.5668 83.3257 42.7656 91.4969 33.3986C95.5759 28.7217 99.794 24.1566 104.164 19.7428C106.323 17.5589 108.521 15.4146 110.76 13.3097C112.799 11.3889 114.772 9.34968 117.328 8.09987C122.328 5.65288 128.221 6.7909 132.287 10.4417C133.664 11.6783 135.724 9.65224 134.333 8.40901L134.34 8.4156Z" fill="black"></path> </svg>
                        <h5>Thank you! Your submission has been received!</h5>
                        <style>
                            #success-message {
                                width: 750px;
                                justify-content: center;
                                flex-direction: column;
                                align-items: center;
                                gap: 100px;
                                background: #fff;
                                border-radius: 30px;
                                margin: auto;
                                height: 600px;
                            }

                            #success-message h5 {
                                background: linear-gradient(180deg, #EA686B 0%, #ED8155 100%);
                                box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.22);
                                border-radius: 60px;
                                width: 600px;
                                height: 75px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: #FFFFFF;
                                font-weight: 600;
                                font-size: 20px;
                            }
                        </style>
                    </div>
            </div>
			
			<div class="contact-form-mobile" id="contact-form-mobile">
				<div class="contact-form-mobile-shortcode" id="contact-form-mobile-shortcode">
				<?php echo do_shortcode('[contact-form-7 id="1339" title="Contact form mobile"]') ?>
				</div>	

                <div id="success-message2" style="display: none;">
                        <svg width="105" height="110" viewBox="0 0 139 138" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M69.5087 136.584C107.093 136.584 137.56 106.318 137.56 68.9823C137.56 31.6471 107.093 1.38086 69.5087 1.38086C31.9248 1.38086 1.45703 31.6471 1.45703 68.9823C1.45703 106.318 31.9248 136.584 69.5087 136.584Z" fill="#E64A19"></path> <path d="M136.106 68.984C136.08 82.7056 131.782 96.151 123.783 107.34C115.784 118.529 104.971 126.587 92.4227 131.126C79.2586 135.895 64.6974 136.428 51.2222 132.619C38.2502 128.949 26.6158 121.305 18.0274 110.984C9.37941 100.578 4.08201 87.5009 3.08213 74.049C2.08224 60.5971 5.3269 46.4744 12.5247 34.6933C19.4709 23.3201 29.8472 14.203 42.0246 8.68413C54.6655 2.96133 69.1605 1.37593 82.7681 4.13209C96.3758 6.88825 108.288 13.5518 117.651 23.2805C127.048 33.0356 133.246 45.5534 135.338 58.8934C135.861 62.2284 136.093 65.6096 136.1 68.984C136.1 70.8324 139 70.839 138.993 68.984C138.967 54.7231 134.504 40.6134 126.147 28.9967C117.983 17.6432 106.481 8.90122 93.2901 4.09933C80.0996 -0.702567 64.4193 -1.38015 50.4474 2.56662C36.4755 6.51338 24.7352 14.3411 15.8422 25.1092C6.94919 35.8773 1.30747 49.5659 0.201644 63.6888C-0.904187 77.8116 2.55901 92.5528 10.0813 104.821C17.3056 116.602 28.1057 126.173 40.7664 131.856C54.1159 137.849 69.187 139.513 83.5429 136.605C97.8988 133.698 110.023 126.771 119.704 116.72C129.385 106.669 136.04 93.5065 138.172 79.6139C138.709 76.0947 138.993 72.5427 139 68.9775C139 67.1291 136.106 67.1225 136.106 68.9775V68.984Z" fill="black"></path> <path d="M133.32 9.42866C127.328 3.96897 118.819 3.99528 112.846 9.42866C97.4636 23.4199 83.7367 39.5425 71.4203 56.211C69.9966 58.1318 68.606 60.0788 67.2353 62.039C63.3219 57.8094 59.2826 53.6982 55.1308 49.6988C49.6877 44.4562 40.0001 43.9168 34.6564 49.6988C29.4186 55.369 28.8491 64.4466 34.6564 70.0379C37.5832 72.8532 40.4305 75.754 43.2447 78.6746C45.7941 81.3255 48.3038 84.0159 50.7538 86.7589C52.1047 88.2719 53.4422 89.8045 54.7467 91.3635C55.3427 92.0739 55.9387 92.7909 56.5214 93.5145C56.8061 93.8697 57.0842 94.2248 57.3689 94.58C57.6206 94.8892 57.5941 94.8498 57.4418 94.6459C60.4282 98.2111 63.9774 100.625 69.0232 100.625C74.069 100.625 79.0353 97.8954 81.525 93.5013C85.4782 86.5221 89.8684 79.7863 94.5632 73.2742C95.636 71.7875 96.722 70.3141 97.8212 68.8472C98.3642 68.1236 98.9137 67.4066 99.4633 66.6896C99.47 66.6765 99.4832 66.6633 99.4898 66.6567C99.6223 66.4923 99.7348 66.3475 99.7812 66.2817C101.986 63.4927 104.244 60.7366 106.542 58.02C113.601 49.6726 121.057 41.6277 128.884 33.9907C130.341 32.5699 131.804 31.149 133.314 29.7742C138.916 24.6828 138.902 14.5331 133.314 9.43524L133.32 9.42866Z" fill="white"></path> <path d="M134.34 8.4156C130.274 4.76484 124.791 3.08093 119.394 4.34389C116.686 4.97537 114.196 6.34362 112.11 8.15913C109.7 10.2509 107.402 12.5071 105.124 14.7371C95.8872 23.7817 87.3252 33.4907 79.2864 43.5944C74.6843 49.3764 70.2081 55.2638 65.9834 61.3221L68.2546 61.0325C65.5728 58.1382 62.8315 55.29 60.0371 52.5009C57.7327 50.2052 55.4879 47.6399 52.5611 46.1072C47.6345 43.5287 41.3042 43.3643 36.5034 46.3375C31.7026 49.3107 28.7891 55.2834 29.0738 60.9076C29.2195 63.7821 30.1267 66.637 31.8351 68.9787C32.8217 70.3338 34.0401 71.4586 35.2387 72.6295C36.6491 74.0174 38.0463 75.4185 39.4302 76.8261C42.463 79.9178 45.4494 83.0555 48.3563 86.259C49.8197 87.8706 51.2699 89.5019 52.6869 91.1595C53.998 92.6922 55.2098 94.3104 56.5342 95.8233C57.6069 97.0468 59.7192 95.4417 58.8054 94.0801C58.7723 94.0275 58.7326 93.9683 58.6862 93.9222L56.415 95.6655C58.9379 98.6453 62.1825 101.099 66.1158 101.796C70.261 102.533 74.6446 101.632 78.1078 99.2372C79.803 98.0598 81.273 96.5996 82.392 94.8696C83.7098 92.8238 84.8421 90.6531 86.1069 88.5744C88.7688 84.2198 91.5897 79.9574 94.5363 75.7869C100.383 67.5251 106.734 59.7959 113.501 52.1918C116.898 48.3766 120.374 44.6403 123.937 40.9764C125.685 39.1872 127.446 37.4113 129.234 35.6615C131.022 33.9118 133.002 32.1686 134.797 30.3465C140.518 24.525 140.319 13.9805 134.333 8.4156C132.976 7.15263 130.923 9.1787 132.287 10.4482C136.902 14.7305 137.399 22.8542 133.32 27.6824C131.903 29.3598 130.115 30.7675 128.546 32.2935C126.817 33.9709 125.109 35.6614 123.42 37.3783C119.977 40.8646 116.613 44.4298 113.329 48.0608C106.899 55.165 100.701 62.4929 95.0197 70.1957C92.126 74.1227 89.3317 78.1287 86.683 82.2202C85.352 84.2725 84.0541 86.3511 82.796 88.4495C81.6571 90.3505 80.6903 92.4686 79.3262 94.2183C76.7768 97.4744 72.6316 99.3227 68.4996 99.178C64.3677 99.0333 61.0701 96.7113 58.4677 93.6328C57.4215 92.3962 55.2098 94.0605 56.1964 95.3761C56.2362 95.4287 56.2759 95.4813 56.3157 95.5339L58.5869 93.7907C56.3024 91.1924 54.1901 88.4494 51.8857 85.8642C49.5814 83.2791 46.9988 80.5099 44.4892 77.8919C41.9796 75.2738 39.4302 72.6755 36.8345 70.143C35.8015 69.13 34.742 68.1696 33.9474 66.9461C33.2455 65.8673 32.729 64.7163 32.3913 63.4796C31.0935 58.6843 32.7952 53.2377 36.4902 49.9159C40.1851 46.594 45.6547 46.2585 50.0581 48.0806C53.0975 49.337 55.2628 51.8038 57.5407 54.0732C60.494 57.0069 63.381 59.9998 66.2085 63.052C66.8839 63.7821 67.9766 63.4862 68.4798 62.7626C75.5849 52.5668 83.3257 42.7656 91.4969 33.3986C95.5759 28.7217 99.794 24.1566 104.164 19.7428C106.323 17.5589 108.521 15.4146 110.76 13.3097C112.799 11.3889 114.772 9.34968 117.328 8.09987C122.328 5.65288 128.221 6.7909 132.287 10.4417C133.664 11.6783 135.724 9.65224 134.333 8.40901L134.34 8.4156Z" fill="black"></path> </svg>
                        <h5>Thank you! Your submission has been received!</h5>
                        
                        <style>
                            #success-message2 {
                                flex-direction: column;
                                width: 400px;
                                align-items: center;
                                gap: 60px;
                                margin-top: 60px;
                            }

                            #success-message2 h5 {
                                background: linear-gradient(180deg, #EA686B 0%, #ED8155 100%);
                                box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.22);
                                border-radius: 60px;
                                width: 340px;
                                height: 55px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: #FFFFFF;
                                font-weight: 600;
                                font-size: 12px;
                            }
                        </style>   
            </div>
			</div>

            
			
        </div>
    </div>
	
	

   
<script>
	jQuery(function($) {
		
    $(document).ready(function() {
		
		
var prevSetup = Selectize.prototype.setup;
Selectize.prototype.setup = function() {
prevSetup.call(this);
this.$control_input.prop('readonly', true);
};
		
    var platformOptions = {
        dropdownParent: 'body',
        maxItems: 1,
		 closeAfterSelect: false,
        create: false,
        onDropdownOpen: function($dropdown) {
            $dropdown.css('z-index', 9999);
        }
    };
		
		 var options = {
        dropdownParent: 'body',
        closeAfterSelect: false,
        create: false, // Опция для запрета создания новых опций
        onDropdownOpen: function($dropdown) {
            $dropdown.css('z-index', 9999);
        }
    };

    var categoryOptions = {
    // Опции Selectize
    dropdownParent: 'body',
    maxItems: 1,
    onDropdownOpen: function($dropdown) {
      $dropdown.css('z-index', 9999); // Устанавливаем высокий z-index для выпадающего списка
    },
    
  };
		
		

	//Мобильная инициализация

    // Инициализация Selectize для платформы
    $(".platform-custom-select1").selectize(platformOptions);

    // Инициализация Selectize для категорий
    $(".category-custom-select1").selectize(categoryOptions);

    // Обработчик изменения платформы
    $('#platform-custom-select').change(function() {
        var selectedPlatform = $(this).val();
        var categorySelectize = $(".category-custom-select1")[0].selectize;

        // Очистка списка опций Category перед обновлением
        categorySelectize.clearOptions();

        // Обновление списка опций Category в зависимости от выбранной платформы
        if (selectedPlatform === 'platform1') {
            categorySelectize.addOption({ value: 'category0', text: 'Category' });
            categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/video-views/', text: 'Video Views' });
            categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/group-joins/', text: 'Group Joins' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/facebook-likes/', text: 'Likes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/followers/', text: 'Followers' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/5-star-reviews/', text: '5 Stars Reviews' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/events/', text: 'Events' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/facebook-comments/', text: 'Comments' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/facebook-friends/', text: 'Friends' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/facebook-likes-post-photo/', text: 'Likes Post/Photo' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/facebook-emotion-post-likes/', text: 'Emotion Post Likes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/facebook-fanpage-post-share/', text: 'Fanpage Post Share' });
            // ... добавьте остальные опции для platform1
        } else if (selectedPlatform === 'platform2') {
            categorySelectize.addOption({ value: 'category0', text: 'Category' });
            categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/instagram-followers/', text: 'Followers' });
            categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/instagram-auto-likes/', text: 'Auto Likes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/instagram-comments/', text: 'Comments' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/instagram-packages/', text: 'Packages' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/instagram-video-views/', text: 'Video Views' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/instagram-story-views/', text: 'Story Views' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/instagram-views/', text: 'Views' });
            // ... добавьте остальные опции для platform2
        } else if (selectedPlatform === 'platform3') {
			categorySelectize.addOption({ value: 'category0', text: 'Category' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/youtube-subcribes/', text: 'Subcribes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/youtube-views/', text: 'Views' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/youtube-likes/', text: 'Likes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/youtube-dislikes/', text: 'Dislikes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/youtube-comments-likes/', text: 'Comments Likes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/youtube-reshare/', text: 'Reshare' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/youtube-comments/', text: 'Comments' });
            // ... добавьте опции для platform3
        } else if (selectedPlatform === 'platform4') {
			categorySelectize.addOption({ value: 'category0', text: 'Category' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/twitter-followers/', text: 'Followers' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/twitter-favorite-likes/', text: 'Favorite/Likes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/twitter-re-tweets/', text: 'Re-Tweets' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/twitter-comments/', text: 'Comments' });
		} else if (selectedPlatform === 'platform5') {
			categorySelectize.addOption({ value: 'category0', text: 'Category' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/tiktok-views/', text: 'Views' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/tiktok-reshare/', text: 'Reshare' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/tiktok-likes/', text: 'Likes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/tiktok-followers/', text: 'Followers' });
		} else if (selectedPlatform === 'platform6') {
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/linkedin-accounts/', text: 'Accounts' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/linkedin-endorsements/', text: 'Endorsements' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/linkedin-shares/', text: 'Shares' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/linkedin-followers/', text: 'Followers' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/linkedin-connections/', text: 'Connections' });
		}
        // ... продолжайте добавлять условия для остальных платформ

        // Вызовите метод refreshOptions, чтобы обновить список опций в Selectize
        categorySelectize.refreshOptions(false);
        categorySelectize.setValue('category0'); // Установка значения "Category" по умолчанию
    });

    // Обработчик клика по кнопке "Get started"
    $('.first__get-button').click(function() {
        var selectedLink = $('#category-custom-select').val();
        if (selectedLink !== '') {
            window.location.href = selectedLink;
        }
    });
});
		
		
});


jQuery(function($) {
		
		
    $(document).ready(function() {
		
		
var prevSetup = Selectize.prototype.setup;
Selectize.prototype.setup = function() {
prevSetup.call(this);
this.$control_input.prop('readonly', true);
};
		
    var platformOptions = {
        dropdownParent: 'body',
        maxItems: 1,
		 closeAfterSelect: false,
        create: false,
        onDropdownOpen: function($dropdown) {
            $dropdown.css('z-index', 9999);
        }
    };
		
		 var options = {
        dropdownParent: 'body',
        closeAfterSelect: false,
        create: false, // Опция для запрета создания новых опций
        onDropdownOpen: function($dropdown) {
            $dropdown.css('z-index', 9999);
        }
    };
		
		$('#category-custom-select-mob').selectize({
   			dropdownDirection: 'down',
    dropdownParent: 'body',
    maxItems: 1,
    onDropdownOpen: function($dropdown) {
      $dropdown.css('z-index', 9999); // Устанавливаем высокий z-index для выпадающего списка
    },
    // Другие опции и настройки
  });

    var categoryOptions = {
    // Опции Selectize
    dropdownDirection: 'down',
    dropdownParent: 'body',
    maxItems: 1,
    onDropdownOpen: function($dropdown) {
      $dropdown.css('z-index', 9999); // Устанавливаем высокий z-index для выпадающего списка
    },
    
  };
		
		$('.first__get-mobile').click(function() {
    $('#platform-custom-select-mob')[0].selectize.open();
  });
		
		$('.first__get-mobile1').click(function() {
    $('#category-custom-select-mob')[0].selectize.open();
  });
		
		

	//Мобильная инициализация

    // Инициализация Selectize для платформы
    $(".platform-custom-select-mob").selectize(platformOptions);

    // Инициализация Selectize для категорий
   // $(".category-custom-select-mob").selectize(categoryOptions);

    // Обработчик изменения платформы
    $('#platform-custom-select-mob').change(function() {
        var selectedPlatform = $(this).val();
        var categorySelectize = $(".category-custom-select-mob")[0].selectize;

        // Очистка списка опций Category перед обновлением
        categorySelectize.clearOptions();

        // Обновление списка опций Category в зависимости от выбранной платформы
        if (selectedPlatform === 'platform1') {
            categorySelectize.addOption({ value: 'category0', text: 'Category' });
            categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/video-views/', text: 'Video Views' });
            categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/group-joins/', text: 'Group Joins' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/facebook-likes/', text: 'Likes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/followers/', text: 'Followers' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/5-star-reviews/', text: '5 Stars Reviews' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/events/', text: 'Events' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/facebook-comments/', text: 'Comments' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/facebook-friends/', text: 'Friends' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/facebook-likes-post-photo/', text: 'Likes Post/Photo' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/facebook-emotion-post-likes/', text: 'Emotion Post Likes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/facebook-fanpage-post-share/', text: 'Fanpage Post Share' });
            // ... добавьте остальные опции для platform1
        } else if (selectedPlatform === 'platform2') {
            categorySelectize.addOption({ value: 'category0', text: 'Category' });
            categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/instagram-followers/', text: 'Followers' });
            categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/instagram-auto-likes/', text: 'Auto Likes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/instagram-comments/', text: 'Comments' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/instagram-packages/', text: 'Packages' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/instagram-video-views/', text: 'Video Views' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/instagram-story-views/', text: 'Story Views' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/instagram-views/', text: 'Views' });
            // ... добавьте остальные опции для platform2
        } else if (selectedPlatform === 'platform3') {
			categorySelectize.addOption({ value: 'category0', text: 'Category' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/youtube-subcribes/', text: 'Subcribes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/youtube-views/', text: 'Views' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/youtube-likes/', text: 'Likes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/youtube-dislikes/', text: 'Dislikes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/youtube-comments-likes/', text: 'Comments Likes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/youtube-reshare/', text: 'Reshare' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/youtube-comments/', text: 'Comments' });
            // ... добавьте опции для platform3
        } else if (selectedPlatform === 'platform4') {
			categorySelectize.addOption({ value: 'category0', text: 'Category' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/twitter-followers/', text: 'Followers' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/twitter-favorite-likes/', text: 'Favorite/Likes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/twitter-re-tweets/', text: 'Re-Tweets' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/twitter-comments/', text: 'Comments' });
		} else if (selectedPlatform === 'platform5') {
			categorySelectize.addOption({ value: 'category0', text: 'Category' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/tiktok-views/', text: 'Views' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/tiktok-reshare/', text: 'Reshare' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/tiktok-likes/', text: 'Likes' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/tiktok-followers/', text: 'Followers' });
		} else if (selectedPlatform === 'platform6') {
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/linkedin-accounts/', text: 'Accounts' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/linkedin-endorsements/', text: 'Endorsements' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/linkedin-shares/', text: 'Shares' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/linkedin-followers/', text: 'Followers' });
			categorySelectize.addOption({ value: 'https://boostmysocials.ae/product/linkedin-connections/', text: 'Connections' });
		}
        // ... продолжайте добавлять условия для остальных платформ

        // Вызовите метод refreshOptions, чтобы обновить список опций в Selectize
        categorySelectize.refreshOptions(false);
        categorySelectize.setValue('category0'); // Установка значения "Category" по умолчанию
    });

    // Обработчик клика по кнопке "Get started"
    $('.first__get-button-mobile').click(function() {
        var selectedLink = $('#category-custom-select-mob').val();
        if (selectedLink !== '') {
            window.location.href = selectedLink;
        }
    });
});
		
		
});






</script>
    

</main>

<?php get_footer(); ?>
