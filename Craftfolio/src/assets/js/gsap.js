/**
 * GSAP JS
 * all gsap functions are here
 * 
 * @link https://greensock.com
 * @link https://greensock.com/docs/v3/GSAP
 */

"use strict";
import { gsap, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitType from 'split-type';


document.addEventListener("DOMContentLoaded", function () {

    // gsap
    gsap.registerPlugin(ScrollTrigger);

    // Title animation with enhanced smoothness
    const splitAndAnimate = (
        selector,
        splitType,
        child,
        triggerStart = "95%",
        staggerDelay = 0.02,
        animationParams = {}
    ) => {
        gsap.utils.toArray(selector).forEach(title => {
            // Split text
            new SplitType(title, { types: splitType });

            // Select child elements
            const elements = title.querySelectorAll(`.${child}`);

            // Default animation parameters
            const defaultParams = {
                duration: 0.8,
                y: 130,
                opacity: 0,
                ease: "power3.out", // Smoother easing
                stagger: staggerDelay
            };

            // Merge default parameters with custom parameters
            const finalParams = { ...defaultParams, ...animationParams };

            gsap.timeline({
                scrollTrigger: {
                    trigger: title, // Changed from el to entire title
                    start: `top ${triggerStart}`,
                    toggleActions: "restart pause resume reverse",
                }
            })
                .set(elements, { overflow: "hidden" })
                .from(elements, finalParams);
        });
    };

    // Words animation with smooth parameters
    splitAndAnimate('.text-animation-word', 'words,chars', 'char', '100%', 0.03, {
        duration: 0.9,
        y: 40,
        opacity: 0,
        ease: "elastic.out(0.5, 0.3)", // Very smooth elastic effect
        stagger: 0.03
    });

    // Lines animation with different smooth parameters
    splitAndAnimate('.text-animation-line', 'lines', 'line', '100%', 0.1, {
        duration: 1,
        y: 20,
        opacity: 0,
        ease: "power4.out", // Smooth power easing
        stagger: 0.1
    });


    // Selecting the SVG path for animation
    const svgLine = document.querySelectorAll('.svg-line');

    function svgLineAnimation(svgLine) {
        const line = svgLine.querySelector('.line');
        svgLine.addEventListener('mousemove', (e) => {
            const svgLineRect = svgLine.getBoundingClientRect();
            const offsetX = e.clientX - svgLineRect.left;
            const offsetY = e.clientY - svgLineRect.top;

            const controlX = 400 + (offsetX - svgLineRect.width / 2) / 2;
            const controlY = (offsetY - svgLineRect.height / 2) * 1.5;

            gsap.to([line], {
                duration: 0.5,
                attr: {
                    d: `M 0 0 Q ${controlX} ${controlY} 1200 0`
                },
                ease: 'power3.out'
            });
        });

        svgLine.addEventListener('mouseleave', () => {
            gsap.to([line], {
                duration: 1,
                attr: {
                    d: 'M 0 1 Q 400 0 1200 0'
                },
                ease: 'elastic.out(1, 0.3)'
            });
        });
    }
    // Calling the SVG animation function
    if (svgLine) {
        svgLine.forEach(el => svgLineAnimation(el));
    }


    function initParallax({
        wrapperSelector = '.parallax-wrapper',
        itemSelectors = {
            single: '.parallax',
            multiple: '.parallax-image'
        },
        config = {
            single: {
                x: 100,
                y: 50,
                scale: 1,
                duration: 0.5,
                ease: 'power3.out',
                resetConfig: false
            },
            multiple: {
                x: 10,
                y: 10,
                scale: 1.1,
                duration: 0.3,
                ease: 'power4.out',
                resetConfig: true
            }
        }
    } = {}) {
        const wrapper = document.querySelector(wrapperSelector);
        if (!wrapper) return;

        // Get elements
        const singleElement = wrapper.querySelector(itemSelectors.single);
        const multipleElements = wrapper.querySelectorAll(itemSelectors.multiple);

        // Function to handle mousemove
        const handleMouseMove = (event) => {
            // Check screen width before applying effect
            if (window.innerWidth >= 992) {
                const { width, height } = wrapper.getBoundingClientRect();
                const x = (event.clientX - wrapper.offsetLeft) / width - 0.5;
                const y = (event.clientY - wrapper.offsetTop) / height - 0.5;

                // Handle single element
                if (singleElement) {
                    gsap.to(singleElement, {
                        x: x * config.single.x,
                        y: y * config.single.y,
                        scale: config.single.scale,
                        duration: config.single.duration,
                        ease: config.single.ease,
                        transformOrigin: "center center"
                    });
                }

                // Handle multiple elements
                if (multipleElements.length) {
                    multipleElements.forEach(element => {
                        gsap.to(element, {
                            x: x * config.multiple.x,
                            y: y * config.multiple.y,
                            scale: config.multiple.scale,
                            duration: config.multiple.duration,
                            ease: config.multiple.ease,
                            transformOrigin: "center center"
                        });
                    });
                }
            }
        };

        // Function to handle mouseleave
        const handleMouseLeave = () => {
            // Check screen width before applying reset
            if (window.innerWidth >= 992) {
                const resetConfig = {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power4.out',
                    transformOrigin: "center center"
                };

                if (config.single.resetConfig && singleElement) {
                    gsap.to(singleElement, resetConfig);
                }

                if (config.multiple.resetConfig && multipleElements.length) {
                    multipleElements.forEach(element => {
                        gsap.to(element, resetConfig);
                    });
                }
            }
        };

        // Function to reset positions when screen size is below 992px
        const handleResize = () => {
            if (window.innerWidth < 992) {
                const resetConfig = {
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power4.out',
                    transformOrigin: "center center"
                };

                // Reset single element
                if (singleElement) {
                    gsap.set(singleElement, resetConfig);
                }

                // Reset multiple elements
                if (multipleElements.length) {
                    multipleElements.forEach(element => {
                        gsap.set(element, resetConfig);
                    });
                }
            }
        };

        // Add event listeners
        wrapper.addEventListener('mousemove', handleMouseMove);
        wrapper.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', handleResize);

        // Initial check
        handleResize();
    }

    initParallax();

    // Image reveal animation
    const revealAnimation = (selector, axis, itemPercent, imgPercent, scale) => {
        gsap.utils.toArray(selector).forEach(revealItem => {
            const image = revealItem.querySelector("img");
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: revealItem,
                    toggleActions: "play none none reverse",
                    markers: false
                }
            });
            tl.set(revealItem, { autoAlpha: 1 })
                .from(revealItem, 1.5, { [`${axis}Percent`]: itemPercent, ease: Power2.out })
                .from(image, 1.5, { [`${axis}Percent`]: imgPercent, scale, delay: -1.5, ease: Power2.out });
        });
    };

    revealAnimation(".reveal-left", 'x', -100, 100, 1.3);
    revealAnimation(".reveal-bottom", 'y', -100, 100, 1.3);
    revealAnimation(".reveal-scale", 'x', 100, -100, 1.3);

});