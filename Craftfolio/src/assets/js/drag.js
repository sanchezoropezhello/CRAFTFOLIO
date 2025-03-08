
// RTL and LTR Toggler drag function with localStorage
function dragToggleDirection(button) {
    let isDragging = false;
    let offsetX, offsetY;

    // Helper function to get position from either mouse or touch event
    function getPosition(e) {
        if (e.touches) {
            return {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        }
        return {
            x: e.clientX,
            y: e.clientY
        };
    }

    // Start dragging
    function handleStart(e) {
        isDragging = true;
        const pos = getPosition(e);
        offsetX = pos.x - button.getBoundingClientRect().left;
        offsetY = pos.y - button.getBoundingClientRect().top;
        button.style.cursor = "grabbing";
    }

    // Move while dragging
    function handleMove(e) {
        if (!isDragging) return;
        e.preventDefault(); // Prevent scrolling on mobile

        const pos = getPosition(e);
        const { width, height } = button.getBoundingClientRect();

        // Calculate new position in percentages
        const x = ((pos.x - offsetX) / window.innerWidth) * 100;
        const y = ((pos.y - offsetY) / window.innerHeight) * 100;

        // Constrain position to keep the button fully visible
        const constrainedX = Math.min(100 - (width / window.innerWidth) * 100, Math.max(0, x));
        const constrainedY = Math.min(100 - (height / window.innerHeight) * 100, Math.max(0, y));

        // Update button position
        button.style.left = `${constrainedX}%`;
        button.style.top = `${constrainedY}%`;
        button.style.right = "auto";
        button.style.bottom = "auto";
    }

    // Stop dragging
    function handleEnd() {
        if (isDragging) {
            isDragging = false;
            button.style.cursor = "grab";

            // Save the position as percentages to localStorage
            const position = {
                left: button.style.left,
                top: button.style.top
            };
            localStorage.setItem("buttonPosition", JSON.stringify(position));
        }
    }

    // Add both mouse and touch event listeners
    button.addEventListener("mousedown", handleStart);
    button.addEventListener("touchstart", handleStart, { passive: false });

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove, { passive: false });

    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchend", handleEnd);
    document.addEventListener("touchcancel", handleEnd);
}

// Restore button position and direction from localStorage
function restoreSettings(button) {
    const savedPosition = localStorage.getItem("buttonPosition");
    if (savedPosition) {
        const { left, top } = JSON.parse(savedPosition);
        button.style.left = left;
        button.style.top = top;
        button.style.right = "auto";
        button.style.bottom = "auto";
    }
}

// Add event listener to the button
const dragBtn = document.getElementById("drag-btn");
if (dragBtn) {
    // Make the button draggable
    dragToggleDirection(dragBtn);

    // Restore settings on page load
    restoreSettings(dragBtn);
}