document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne tous les boutons "Lire plus/Lire moins"
    const readMoreButtons = document.querySelectorAll('.read-more');

    // Ajoute un événement au clic pour chaque bouton
    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target'); // Récupère l'ID cible
            const fullContent = document.querySelector(`#${targetId} .full-content`); // Sélectionne le contenu complet

            if (fullContent) {
                // Toggle la visibilité du contenu complet et change le texte du bouton
                fullContent.classList.toggle('hidden');
                button.textContent = fullContent.classList.contains('hidden') ? 'Lire plus' : 'Lire moins';
            }
        });
    });
});