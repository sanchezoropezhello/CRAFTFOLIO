/**
 * Plugin js file
 * all the plugins are initialized here
 * 
 * @version 1.0.0
 * @since 1.0.0
 */

"use strict";
import Typewriter from 'typewriter-effect/dist/core';
import Odometer from 'odometer';
import Splitting from 'splitting';
import AOS from 'aos';
import VanillaTilt from 'vanilla-tilt';


document.addEventListener("DOMContentLoaded", function () {

    // Typewriter
    const typewriter = document.querySelectorAll('.typewriter');
    if (typewriter) {
        typewriter.forEach(element => {
            new Typewriter(element, {
                strings: ['Full-stack develop', 'Web designer', 'Web developer'],
                autoStart: true,
                loop: true,
                cursor: '|',
            })
        })
    }

    // Initialize and observe odometers
    const initializeOdometer = (element) => {
        const odometerValue = element.getAttribute('data-odometer-final');
        const od = new Odometer({ el: element, value: 0, format: '(,ddd)', theme: 'default' });
        od.update(odometerValue);
    };

    const odometerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initializeOdometer(entry.target);
                odometerObserver.unobserve(entry.target);
            }
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });
    });

    document.querySelectorAll('.odometer').forEach(el => odometerObserver.observe(el));

    // Splitting
    Splitting();

    // aos animation
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true
    });

    // initialize VanillaTilt
    const smallTilt = document.querySelectorAll('.small-tilt')
    if (smallTilt) {
        VanillaTilt.init(smallTilt, {
            max: 5,
            speed: 500,
            glare: false,
            perspective: 1500,
        })
    }
    const smallTilt2 = document.querySelectorAll('.small-tilt2')
    if (smallTilt2) {
        VanillaTilt.init(smallTilt2, {
            max: 5,
            speed: 500,
            glare: false,
            perspective: 1000,
        })
    }
    const bigTilt = document.querySelectorAll('.big-tilt')
    if (bigTilt) {
        VanillaTilt.init(bigTilt, {
            max: 10,
            speed: 500,
            glare: false,
            perspective: 1200,
            scale: 1.03,
            easing: "cubic-bezier(.03,.98,.52,.99)",
            gyroscope: true,
            gyroscopeMinAngleX: -45,
            gyroscopeMaxAngleX: 45,
            gyroscopeMinAngleY: -45,
            gyroscopeMaxAngleY: 45,
        })
    }

});