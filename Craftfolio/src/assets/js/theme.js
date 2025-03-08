// Theme toggle functionality
export function initializeTheme() {
    const themeToggleBtn = document.querySelectorAll('.theme-toggle');
    const sunIcon = document.querySelectorAll('.sun-icon');
    const moonIcon = document.querySelectorAll('.moon-icon');
    const themeDark = document.querySelectorAll('.theme-dark');
    const themeLight = document.querySelectorAll('.theme-light');


    // Function to set theme
    function setTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            if (sunIcon && moonIcon) {
                sunIcon.forEach((icon) => {
                    icon.classList.add('hidden');
                })
                moonIcon.forEach((icon) => {
                    icon.classList.remove('hidden');
                })
            }
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            if (sunIcon && moonIcon) {
                sunIcon.forEach((icon) => {
                    icon.classList.remove('hidden');
                })
                moonIcon.forEach((icon) => {
                    icon.classList.add('hidden');
                })
            }
        }
    }

    // Check for saved theme preference or system preference
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark);
        }
    }

    // Toggle theme
    if (themeToggleBtn) {
        themeToggleBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                const isDark = document.documentElement.classList.contains('dark');
                setTheme(!isDark);
            });
        })
    }

    if (themeDark) {
        themeDark.forEach((btn) => {
            btn.addEventListener('click', () => {
                setTheme(true);
            });
        })
    }

    if (themeLight) {
        themeLight.forEach((btn) => {
            btn.addEventListener('click', () => {
                setTheme(false);
            });
        })
    }


    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches);
            }
        });

    // Initialize theme on load
    initTheme();
}

initializeTheme();