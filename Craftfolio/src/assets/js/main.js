"use strict";
document.addEventListener("DOMContentLoaded", function () {

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // box hover
    const boxHover = document.querySelectorAll('.box-hover');
    if (boxHover) {
        boxHover.forEach(box => {
            box.addEventListener('mouseover', (e) => {
                const x = e.offsetX + 'px';
                const y = e.offsetY + 'px';
                box.style.setProperty('--x', x);
                box.style.setProperty('--y', y);
            });
        });
    }

    // progress bar
    const progressBar = document.querySelectorAll('.progress-bar')
    const updateProgressBar = (progressBar) => {
        const progressBarValue = progressBar.getAttribute('data-progress-value')
        progressBar.style.width = progressBarValue
    }

    const ProgressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateProgressBar(entry.target);
                observer.unobserve(entry.target); // Stop observing once the animation is done
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    progressBar.forEach(progressBar => { ProgressObserver.observe(progressBar) });

    const parallaxTitles = document.querySelectorAll('.parallax-title');
    const scaleRange = (x, a, b, c, d) => (x - a) / (b - a) * (d - c) + c;

    // Map to store target positions for each title element
    const targetPositions = new Map();

    // Function to smoothly animate the parallax effect for each title
    function animateParallax() {
        parallaxTitles.forEach((title) => {
            const { targetX = 0, targetY = 0 } = targetPositions.get(title) || {};

            // Apply the target translation with smoothing
            title.style.transform = `translate(${targetX}%, ${targetY}%)`;
        });

        // Use requestAnimationFrame to keep the animation loop running
        requestAnimationFrame(animateParallax);
    }

    // Event handler for mousemove, setting target values for animation
    function handleMouseMove(e) {
        const targetX = scaleRange(e.x, 0, window.innerWidth, -7.5, 7.5);
        const targetY = scaleRange(e.y, 0, window.innerHeight, -7.5, 7.5);

        // Store the targetX and targetY for the hovered title
        targetPositions.set(this, { targetX, targetY });
    }

    // Event handler for mouseleave, resetting the target values
    function handleMouseLeave() {
        // Reset targetX and targetY to 0 for a smooth reset animation
        targetPositions.set(this, { targetX: 0, targetY: 0 });
    }

    // Add event listeners to each `.parallax-title` element
    if (parallaxTitles) {
        parallaxTitles.forEach(title => {
            title.addEventListener('mousemove', handleMouseMove.bind(title));
            title.addEventListener('mouseleave', handleMouseLeave.bind(title));
        });
    }

    // Start the animation loop
    requestAnimationFrame(animateParallax);

    // popup
    function controlPopup(popupId, popupBtn) {
        const popup = document.getElementById(popupId);
        const popupTitle = popup.querySelector('.title');
        const popupImage = popup.querySelector('.popup-post-banner');

        // Get the data attributes from the button
        const title = popupBtn.getAttribute('data-title');
        const imgSrc = popupBtn.getAttribute('data-img');

        // Update the popup title and image
        if (popupTitle && title) {
            popupTitle.textContent = title; // Set the title
        }
        if (popupImage && imgSrc) {
            popupImage.src = imgSrc;
            popupImage.alt = title;
        }
        // Show the popup
        popup.classList.add('active');

        const closePopup = popup.querySelector('.close-popup');
        closePopup.addEventListener('click', () => {
            popup.classList.remove('active');
        })
    }

    const popupBtn = document.querySelectorAll('.popup-btn');
    if (popupBtn) {
        popupBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                const popupId = btn.getAttribute('data-popup-id');
                if (popupId) {
                    controlPopup(popupId, btn);
                }
            })
        })
    }

    // current year
    const currentYear = document.querySelector('.currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // demo version code no need to your production
    // Function to set theme and direction in localStorage
    function setThemeAndDirection(theme, direction) {
        localStorage.setItem("theme", theme); // Store theme (light/dark)
        localStorage.setItem("direction", direction); // Store direction (ltr/rtl)
    }

    // Function to handle demo version click
    function handleDemoClick(event) {
        // Get the clicked version's theme and direction
        const demoVersion = event.currentTarget;
        const theme = demoVersion.getAttribute("data-theme");
        const direction = demoVersion.getAttribute("data-direction");

        // Save the theme and direction to localStorage
        setThemeAndDirection(theme, direction);
    }

    // Attach click event to all demo versions
    document.querySelectorAll(".demo-version").forEach((version) => {
        version.addEventListener("click", handleDemoClick);
    });

});