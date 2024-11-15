document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne le bouton de menu et les liens de navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Vérifie si les éléments existent avant d'ajouter l'événement
    if (menuToggle && navLinks) {
        // Ajoute un événement au clic sur le bouton de menu pour afficher/masquer les liens
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active'); // Ajoute ou retire la classe 'active'
        });
    }
});