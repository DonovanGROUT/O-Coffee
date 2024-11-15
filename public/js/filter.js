document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne le menu déroulant pour filtrer par catégorie
    const categorySelect = document.getElementById('categorie');

    if (categorySelect) {
        // Ajoute un événement au changement de sélection dans le menu déroulant
        categorySelect.addEventListener('change', function (event) {
            const selectedCategory = event.currentTarget.value; // Récupère la catégorie sélectionnée
            let url = '/catalogue'; // URL de base pour la redirection

            if (selectedCategory) {
                url += '?category=' + encodeURIComponent(selectedCategory); // Ajoute la catégorie à l'URL si sélectionnée
            }
            window.location.href = url; // Redirige vers l'URL mise à jour
        });
    }
});