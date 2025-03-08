/**
 * all menu
 */

"use strict";
import { animatedHeight } from './animatedHeight';
import { gsap } from "gsap";
import handleOutsideClick from './handleOutSideClick';

document.addEventListener("DOMContentLoaded", function () {
    const body = document.querySelector('body');

    // Menu for index 1, 2 and 3
    const gridCardWrapper = document.querySelectorAll('.grid-card-wrapper');
    const cardSectionWrapper = document.querySelectorAll('.card-section-wrapper');
    const menuArea = document.querySelector('.menu-area')
    const contentArea = document.querySelector('.content-area')
    if (gridCardWrapper && cardSectionWrapper) {

        // Load the saved state from localStorage
        const loadMenuState = () => {
            const savedSectionId = localStorage.getItem('activeSectionId');
            if (savedSectionId) {
                const section = Array.from(cardSectionWrapper).find(section => section.id === savedSectionId);
                if (section) {
                    section.classList.add('active-section');
                    menuArea.classList.add('hidden');
                    contentArea.classList.add('active-content');
                    return section; // Return the active section
                }
            }
            return null;
        };

        // Initialize active section from localStorage
        let activeSection = loadMenuState();

        gridCardWrapper.forEach(card => {
            card.addEventListener('click', () => {
                const cardId = card.getAttribute('data-section-id');
                if (activeSection) {
                    activeSection.classList.remove('active-section');
                }

                activeSection = Array.from(cardSectionWrapper).find(section => section.id === cardId);
                if (activeSection) {
                    activeSection.classList.add('active-section');
                    menuArea.classList.add('hidden')
                    contentArea.classList.add('active-content')

                    // Save to localStorage
                    localStorage.setItem('activeSectionId', cardId);
                }
            });
        });

        cardSectionWrapper.forEach(section => {
            const backToMenu = section.querySelector('.back-to-menu');
            if (backToMenu) {
                backToMenu.addEventListener('click', () => {
                    if (activeSection) {
                        activeSection.classList.remove('active-section');
                    }
                    menuArea.classList.remove('hidden')
                    contentArea.classList.remove('active-content')

                    // Clear localStorage when returning to menu
                    localStorage.removeItem('activeSectionId');
                    activeSection = null;
                });
            }
        });
    }


    // menu toggle 
    const menuToggleBtn = document.querySelector('.menu-toggle-btn')
    const menuWrapper = document.querySelector('.menu-wrapper')
    if (menuToggleBtn && menuWrapper) {
        menuToggleBtn.addEventListener('click', function () {
            this.classList.toggle('active')
            menuWrapper.classList.toggle('active-menu')
        })
    }

    // version 2 menu toggle
    // menu 2
    const menuBtn2 = document.querySelector(".menu-btn-2");
    const menuArea2 = document.querySelector('.main-menu-2');

    if (menuBtn2 && menuArea2) {
        const menuLinks2 = menuArea2.querySelectorAll('li');

        var tl = gsap.timeline({ paused: true });

        tl.to(menuArea2, {
            duration: 0.8,
            opacity: 1,
            height: '90vh',
            ease: "elastic.out(1.4, 0.5)",
        })
            .from(menuLinks2, {
                duration: 1.5,
                opacity: 0,
                y: 60,
                stagger: 0.1,
                ease: "elastic.out(1.5, 0.2)",
            }, "+=0.2"); // Add positive value for delay


        tl.reverse();

        menuBtn2.addEventListener('click', (e) => {
            menuBtn2.classList.toggle('active');
            body.classList.toggle('overflow-hidden');
            tl.reversed(!tl.reversed());
        });
    }


    // version 2 menu toggle
    // mobile menu
    const menuItems2 = document.querySelectorAll(".menu-item button");
    menuItems2.forEach(function (link) {
        const subMenu = link.parentElement.querySelector(".sub-menu");
        animatedHeight(link, subMenu);

        // sub menu
        if (subMenu) {
            const subMenuItems = subMenu.querySelectorAll(".menu-item button");
            subMenuItems.forEach(item => {
                const subSubMenu = item.querySelector(".sub-menu");
                animatedHeight(item, subSubMenu);
            })
        }
    });


    // menu 3
    const menuArea3 = document.querySelector('.menu-wrapper-3');
    const menuBtn3 = document.querySelector('.menu-btn-3');
    const menu3 = document.querySelector('.main-menu-3');
    const menuItems3 = document.querySelectorAll('.menu-items li');

    if (menuArea3 && menuBtn3 && menu3) {
        menuBtn3.addEventListener('click', () => {
            menuArea3.classList.toggle('active');
            menu3.classList.toggle('active');
            menuBtn3.classList.toggle('active');
            body.classList.toggle('overflow-hidden');
        });

        menuItems3.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });

        handleOutsideClick(menu3, () => {
            menuArea3.classList.remove('active');
            menu3.classList.remove('active');
            menuBtn3.classList.remove('active');
            body.classList.remove('overflow-hidden');
        }, {
            excludeElements: [menuBtn3]
        });
    }

    // menu 4
    const menuBtn4 = document.querySelector('.menu-btn-4');
    const menu4 = document.querySelector('.main-menu-4');
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const initialXValue = isRtl ? 350 : -350;

    if (menuBtn4) {
        gsap.set('.menu-wrapper-4', { width: 0 });
        gsap.set('.main-menu-4', { width: 0 });
        gsap.set('.main-menu-4 li', { x: initialXValue });

        // Function to get menu width based on screen size
        function getMenuWidth() {
            if (window.innerWidth <= 768) {
                return '80%';  // Width for mobile screens
            }
            return '50%';     // Default width for larger screens
        }

        // Function to get margin bottom based on screen size
        function getMarginBottom() {
            if (window.innerWidth <= 991) {
                return '15px';  // Margin for tablet screens
            }
            return '30px';     // Default margin for larger screens
        }

        const createMenuTimeline = () => {
            return gsap.timeline({ paused: true })
                .to('.menu-wrapper-4', {
                    width: '100%',
                    duration: 0.4,
                    autoAlpha: 1
                })
                .to('.main-menu-4', {
                    width: getMenuWidth(),
                    duration: 0.4,
                    autoAlpha: 1
                })
                .to('.main-menu-4 li', {
                    x: 0,
                    duration: 0.4,
                    ease: "sine.out",
                    stagger: 0.2
                })
                .to('.main-menu-4 li', {
                    marginBottom: getMarginBottom(),
                    duration: 1,
                    ease: "power1.out"
                });
        };

        let menuArea4Motion = createMenuTimeline();
        menuArea4Motion.reverse(true);

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Kill old timeline and create new one with updated values
                menuArea4Motion.kill();
                menuArea4Motion = createMenuTimeline();
                menuArea4Motion.reverse(true);

                // If menu is currently open, play the new timeline
                if (menu4.classList.contains('active')) {
                    menuArea4Motion.play(0);
                }
            }, 250); // Debounce resize events
        });

        menuBtn4.addEventListener('click', function () {
            document.querySelector('.main-menu-4').classList.toggle('active');
            body.classList.toggle('overflow-hidden');
            if (menuArea4Motion.reversed()) {
                menuArea4Motion.play(0);
            } else {
                menuArea4Motion.reverse();
            }
        });

        handleOutsideClick(menu4, () => {
            menuArea4Motion.reverse();
            body.classList.remove('overflow-hidden');
        }, {
            excludeElements: [menuBtn4]
        });
    }

    // menu 6
    const menuBtn6 = document.querySelector('.menu-btn-6');
    const menu6 = document.querySelector('.main-menu-6');
    if (menuBtn6) {
        gsap.set('.main-menu-6', { xPercent: 100 });

        const menuArea6Motion = gsap.timeline({ paused: true })
            .to('.main-menu-6', {
                xPercent: 0,
                duration: 0.4,
                autoAlpha: 1
            })
        // Ensure timeline starts in the reversed state
        menuArea6Motion.reverse(true);

        menuBtn6.addEventListener('click', function () {
            document.querySelector('.main-menu-6').classList.toggle('active');
            body.classList.toggle('overflow-hidden');
            menuBtn6.classList.toggle('active');
            if (menuArea6Motion.reversed()) {
                menuArea6Motion.play(0); // Ensure it plays from the start
            } else {
                menuArea6Motion.reverse();
            }
        });

        handleOutsideClick(menu6, () => {
            menuArea6Motion.reverse();
            body.classList.remove('overflow-hidden');
            menuBtn6.classList.remove('active');
        }, {
            excludeElements: [menuBtn6]
        });
    }

    // menu 7
    const menuBtn7 = document.querySelector('.menu-button-v7');
    const menu7 = document.querySelector('.menu-area-v7');
    if (menuBtn7 && menu7) {
        menuBtn7.addEventListener('click', () => {
            menu7.classList.toggle('active');
            body.classList.toggle('overflow-hidden');
        })

        handleOutsideClick(menu7, () => {
            menu7.classList.remove('active');
            body.classList.remove('overflow-hidden');
        }, {
            excludeElements: [menuBtn7]
        });
    }

    // Unified Menu System
    const initializeUnifiedMenu = (config) => {
        const {
            menuWrapperSelector,
            menuToggleBtnSelector,
            menuCloseBtnSelector,
            menuAreaSelector,
            menuLinkSelector,
            menuHomeSelector = null,
            defaultMenuId,
            indexPageSelector
        } = config;

        const menuWrapper = document.querySelector(menuWrapperSelector);
        const menuToggleBtn = document.querySelector(menuToggleBtnSelector);
        const menuCloseBtn = document.querySelector(menuCloseBtnSelector);
        const menuItems = document.querySelectorAll(`${menuAreaSelector} .menu-item`);
        const menuLinks = document.querySelectorAll(menuLinkSelector);
        const menuHome = document.querySelector(menuHomeSelector);

        // ======== Menu Activation ========
        const activateMenu = (sectionId) => {
            // Deselect all menu items
            menuItems.forEach((menuItem) => {
                menuItem.classList.remove('active');

                // Activate the correct section
                if (menuItem.id === sectionId) {
                    menuItem.classList.add('active');
                    localStorage.setItem('activeMenu', sectionId);
                }
            });

            // Optional: Close mobile menu after selection
            menuWrapper?.classList.remove('active');
            body.classList.remove('overflow-hidden');
        };


        // ======== Reset Local Storage ========
        const resetLocalStorage = () => {
            // Remove the stored active menu
            localStorage.removeItem('activeMenu');
        };

        // ======== Menu Toggle ========
        const toggleMenuVisibility = () => {
            if (menuToggleBtn && menuWrapper) {
                menuToggleBtn.addEventListener('click', () => {
                    menuWrapper.classList.toggle('active');
                    body.classList.toggle('overflow-hidden');
                });

                menuCloseBtn?.addEventListener('click', () => {
                    menuWrapper.classList.remove('active');
                    body.classList.remove('overflow-hidden');
                });
            }
        };

        // ======== Attach Menu Click Handlers ========
        const attachMenuClickHandlers = () => {
            menuLinks.forEach((link) => {
                link.addEventListener('click', (e) => {
                    const sectionId = link.getAttribute('data-section-id');
                    if (sectionId) {
                        activateMenu(sectionId);
                    }
                });
            });
        };

        // ======== Menu Item Click Handling ========
        function attachMenuItemClickHandlers() {
            menuItems.forEach((item) => {
                item.addEventListener('click', () => {
                    activateMenu(item.id); // Use item ID as section ID
                });
            });

            // Home button specific handling
            if (menuHome) {
                menuHome.addEventListener('click', () => activateMenu(defaultMenuId));
            }
        }

        // ======== Initialize Menu ========
        const initializeMenu = () => {
            const storedIndexPage = localStorage.getItem('activeIndexPage');
            if (storedIndexPage && storedIndexPage !== indexPageSelector) {
                resetLocalStorage();
            }
            localStorage.setItem('activeIndexPage', indexPageSelector);

            const savedMenu = localStorage.getItem('activeMenu');
            const initialSection = savedMenu || defaultMenuId;


            // Explicitly activate the initial section
            activateMenu(initialSection);

            toggleMenuVisibility();
            attachMenuItemClickHandlers();
            attachMenuClickHandlers();
        };

        // Start initialization
        initializeMenu();
    };

    // ======== Usage Example ========
    // For Menu 5
    const indexV5 = document.querySelector('.index-v5');
    if (indexV5) {
        initializeUnifiedMenu({
            menuWrapperSelector: '.menu-wrapper-5',
            menuToggleBtnSelector: '.menu-toggle-btn-5',
            menuCloseBtnSelector: '.menu-close-btn-5',
            menuAreaSelector: '.menu-area-v5',
            menuLinkSelector: '.main-menu-5 .menu-link',
            defaultMenuId: 'home-section-v5',
            indexPageSelector: '.index-v5'
        });
    }

    // For Menu 8
    const indexV8 = document.querySelector('.index-v8');
    if (indexV8) {
        initializeUnifiedMenu({
            menuWrapperSelector: '.menu-wrapper-8',
            menuToggleBtnSelector: '.menu-toggle-btn-8',
            menuCloseBtnSelector: '.menu-close-btn-8',
            menuAreaSelector: '.menu-area-v8',
            menuLinkSelector: '.main-menu-8 .menu-link',
            menuHomeSelector: '.home-menu-btn-8',
            defaultMenuId: 'home-section-v8',
            indexPageSelector: '.index-v8'
        });
    }


    // demo menu
    const demoMenuBtn = document.querySelector('.demo-menu-button');
    const demoMenu = document.querySelector('.demo-menu-wrapper');
    if (demoMenuBtn && demoMenu) {
        demoMenuBtn.addEventListener('click', () => {
            demoMenu.classList.toggle('active');
            body.classList.toggle('overflow-hidden');
        })

        handleOutsideClick(demoMenu, () => {
            demoMenu.classList.remove('active');
            body.classList.remove('overflow-hidden');
        }, {
            excludeElements: [demoMenuBtn]
        });
    }

})