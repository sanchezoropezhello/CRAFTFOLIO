
// animated height
export function animatedHeight(button, animatedItem) {
    if (!button || !animatedItem) {
        return;
    }

    // Initial styles for the animated item
    animatedItem.style.maxHeight = '0';
    animatedItem.style.opacity = '0';
    animatedItem.style.overflow = 'hidden';
    animatedItem.style.transition = 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out';

    button.addEventListener("click", function () {
        if (animatedItem.classList.contains("active")) {
            // If active, collapse the animatedItem
            animatedItem.style.maxHeight = animatedItem.scrollHeight + 'px'; // Set to current height

            requestAnimationFrame(() => {
                animatedItem.style.maxHeight = '0'; // Collapse to height 0
            });
        } else {
            // If not active, expand the animatedItem
            animatedItem.style.maxHeight = animatedItem.scrollHeight + 'px'; // Expand to its full height
        }

        animatedItem.classList.toggle("active");

        if (animatedItem.classList.contains("active")) {
            animatedItem.style.opacity = '1'; // Fade in
        } else {
            animatedItem.style.opacity = '0'; // Fade out
        }

        // Clean up after the transition
        animatedItem.addEventListener('transitionend', function () {
            if (!animatedItem.classList.contains("active")) {
                animatedItem.style.maxHeight = '0'; // Remove the height when collapsed
            } else {
                animatedItem.style.maxHeight = 'none'; // Keep it open at full height
            }
        }, { once: true });
    });
}