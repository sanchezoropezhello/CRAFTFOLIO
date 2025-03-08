/**
 * swiper js
 * all swiper js functions are here
 * 
 * @version 1.0
 * @since 1.0
 */

"use strict";
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination, Mousewheel, EffectCoverflow, } from 'swiper/modules';


document.addEventListener("DOMContentLoaded", function () {


    // Initialize Swipers
    const initSwiper = (element, config) => {
        if (element) {
            return new Swiper(element, config);
        }
        return null;
    };

    // testimonial swiper
    // Loop over each Swiper with the same class and initialize them
    const testimonialSwiper = document.querySelectorAll('.testimonial-swiper')
    if (testimonialSwiper) {
        testimonialSwiper.forEach((swiperEl) => {
            initSwiper(swiperEl, {
                modules: [Autoplay],
                slidesPerView: 1.01,
                spaceBetween: 24,
                loop: true,
                speed: 1000,
                autoplay: { delay: 8000, disableOnInteraction: false, },
                breakpoints: {
                    768: {
                        slidesPerView: 2.01,
                        spaceBetween: 24,
                    },
                    992: {
                        slidesPerView: 1,
                        spaceBetween: 24,
                    },
                    1200: {
                        slidesPerView: 2.01,
                        spaceBetween: 24,
                    }
                }
            });
        })
    }

    initSwiper('.testimonial-swiper-2', {
        modules: [Autoplay],
        slidesPerView: 1.01,
        spaceBetween: 24,
        loop: true,
        speed: 1000,
        autoplay: { delay: 8000, disableOnInteraction: false, },
        breakpoints: {
            575: {
                slidesPerView: 2.01,
                spaceBetween: 24,
            },
            768: {
                slidesPerView: 3.01,
                spaceBetween: 24,
            },
            1200: {
                slidesPerView: 2.01,
                spaceBetween: 24,
            },
            1400: {
                slidesPerView: 3.01,
                spaceBetween: 24,
            }
        }
    });


    // portfolio swiper
    const portfolioSwiper = document.querySelectorAll('.portfolio-swiper');
    if (portfolioSwiper) {
        portfolioSwiper.forEach((swiperEl) => {
            initSwiper(swiperEl, {
                modules: [Autoplay, Mousewheel, Pagination],
                slidesPerView: 1,
                spaceBetween: 0,
                direction: "vertical",
                grabCursor: true,
                watchSlidesProgress: true,
                mousewheel: {
                    releaseOnEdges: true,
                    forceToAxis: true,
                },
                speed: 800,
                loop: false,
                pagination: {
                    el: ".portfolio-pagination",
                    clickable: true,
                }
            });
        });
    }

    const portfolioSwiper2 = document.querySelector('.portfolio-swiper-2');
    if (portfolioSwiper2) {
        initSwiper(portfolioSwiper2, {
            modules: [Autoplay, Mousewheel, Pagination],
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            speed: 1000,
            autoplay: { delay: 8000, disableOnInteraction: false, },
            pagination: {
                el: ".portfolio-pagination-2",
                clickable: true,
            },
            mousewheel: {
                releaseOnEdges: true,
                forceToAxis: true,
            },
            mousewheel: true,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
            }
        });
    }

    const articlesSwiper = document.querySelector('.articles-swiper');
    if (articlesSwiper) {
        initSwiper(articlesSwiper, {
            modules: [Autoplay, Pagination, Navigation, EffectCoverflow],
            slidesPerView: 1, // Default for mobile
            spaceBetween: 24,
            loop: true,
            speed: 600,
            centeredSlides: true,
            autoplay: { delay: 8000, disableOnInteraction: false },
            effect: "coverflow",
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 800,
                modifier: 1, // Adjust modifier for better scaling
                slideShadows: false,
            },
            pagination: {
                el: ".articles-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".articles-next",
                prevEl: ".articles-prev",
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
            },
        });
    }


    const demoSwiper = document.querySelector('.demo-swiper');
    if (demoSwiper) {
        initSwiper(demoSwiper, {
            modules: [Autoplay, Pagination, Navigation, EffectCoverflow],
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            speed: 600,
            centeredSlides: true,
            autoplay: { delay: 8000, disableOnInteraction: false },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
            },
        });
    }

    // demo text slider
    const demoTextSlider = document.querySelectorAll('.demo-text-slider');
    if (demoTextSlider) {
        demoTextSlider.forEach((swiperEl) => {
            initSwiper(swiperEl, {
                modules: [Autoplay],
                slidesPerView: "auto",
                spaceBetween: 24,
                loop: true,
                speed: 6000,
                autoplay: { delay: 1, disableOnInteraction: false, },
            });
        })
    }

    // demo text slider
    const demoItemsSlider = document.querySelectorAll('.demo-items-slider');
    if (demoItemsSlider) {
        demoItemsSlider.forEach((swiperEl) => {
            initSwiper(swiperEl, {
                modules: [Autoplay],
                slidesPerView: "auto",
                spaceBetween: 24,
                loop: true,
                speed: 6000,
                autoplay: { delay: 1, disableOnInteraction: false },
            });
        })
    }

});