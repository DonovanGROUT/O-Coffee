document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    const readMoreButtons = document.querySelectorAll('.read-more');
    for (const button of readMoreButtons) {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const fullContent = document.querySelector(`#${targetId} .full-content`);
            fullContent.classList.toggle('hidden');
            button.textContent = fullContent.classList.contains('hidden') ? 'Lire plus' : 'Lire moins';
        });
    }
});