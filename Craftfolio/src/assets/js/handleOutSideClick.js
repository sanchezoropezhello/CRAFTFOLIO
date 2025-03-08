
const handleOutsideClick = (element, callback, options = {}) => {
    const {
        events = ['mousedown', 'touchstart'],
        excludeElements = [],
        enabled = true
    } = options;

    function clickHandler(event) {
        // Skip if disabled
        if (!enabled) return;

        // Check if click is on excluded elements
        const isExcluded = excludeElements.some(el =>
            el.contains(event.target)
        );

        // Return if click is on excluded element
        if (isExcluded) return;

        // Check if click is outside target element
        if (element && !element.contains(event.target)) {
            callback(event);
        }
    }

    // Add all event listeners
    events.forEach(event => {
        document.addEventListener(event, clickHandler);
    });

    // Return cleanup function
    return () => {
        events.forEach(event => {
            document.removeEventListener(event, clickHandler);
        });
    };
};

export default handleOutsideClick;