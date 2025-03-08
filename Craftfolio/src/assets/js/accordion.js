
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach((header) => {
    const accordionItem = header.parentNode;
    const accordionContent = accordionItem.querySelector('.accordion-content');
    const accordionIcon = header.querySelector('.accordion-icon');

    // Initialize accordion states
    if (!accordionItem.classList.contains('show')) {
        accordionContent.style.maxHeight = '0';
        accordionIcon.textContent = '+';
    } else {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        accordionIcon.textContent = '-';
    }

    // Add click event listener
    header.addEventListener('click', () => {
        const isOpen = accordionItem.classList.contains('show');

        // Toggle the clicked item
        if (isOpen) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            requestAnimationFrame(() => {
                accordionContent.style.maxHeight = '0';
                accordionIcon.textContent = '+';
            });
        } else {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            accordionIcon.textContent = '-';
        }

        accordionItem.classList.toggle('show');

        // Close other items
        accordionHeaders.forEach((otherHeader) => {
            const otherItem = otherHeader.parentNode;
            if (otherItem !== accordionItem) {
                otherItem.classList.remove('show');
                const otherContent = otherItem.querySelector('.accordion-content');
                const otherIcon = otherHeader.querySelector('.accordion-icon');
                otherContent.style.maxHeight = '0';
                otherIcon.textContent = '+'; // Properly reset the icon
            }
        });
    });
});
