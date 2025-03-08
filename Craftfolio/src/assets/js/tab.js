
document.addEventListener('DOMContentLoaded', function () {
    // Handle tab clicks
    document.addEventListener('click', function (event) {
        const button = event.target.closest('.tab-btn');
        if (!button) return;

        const tabGroup = button.closest('.tabs-container');
        // const groupId = tabGroup.dataset.tabGroup;

        // Remove active class from all buttons and contents in this group
        tabGroup.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        tabGroup.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});