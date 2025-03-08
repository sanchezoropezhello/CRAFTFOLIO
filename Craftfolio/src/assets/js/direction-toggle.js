
// RTL and LTR Toggle function
function toggleDirection(toggleBtn) {
    const html = document.documentElement;
    const currentDirection = html.getAttribute("dir");

    if (currentDirection === "ltr") {
        html.setAttribute("dir", "rtl");
        toggleBtn.textContent = "LTR";
        localStorage.setItem("direction", "rtl");
    } else {
        html.setAttribute("dir", "ltr");
        toggleBtn.textContent = "RTL";
        localStorage.setItem("direction", "ltr");
    }
}

// Restore direction from localStorage on page load
function initializeDirection(toggleBtn) {
    const html = document.documentElement;
    const savedDirection = localStorage.getItem("direction") || "ltr";
    html.setAttribute("dir", savedDirection);

    if (toggleBtn) {
        toggleBtn.textContent = savedDirection === "rtl" ? "LTR" : "RTL";
    }
}

// Get button reference
const toggleDirectionBtn = document.getElementById("toggle-direction");

if (toggleDirectionBtn) {
    // Initialize on page load
    initializeDirection(toggleDirectionBtn);

    // Add event listener to the button
    toggleDirectionBtn.addEventListener("click", () => toggleDirection(toggleDirectionBtn));
}