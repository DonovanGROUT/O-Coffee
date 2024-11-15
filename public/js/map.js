document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour initialiser la carte Leaflet
    function initMap() {
        if (window.location.pathname === '/notre-boutique') { // Vérifie si nous sommes sur la page "Notre boutique"
            const mapContainer = document.getElementById('map'); // Sélectionne le conteneur de la carte

            if (mapContainer && !mapContainer.classList.contains('leaflet-container')) {
                const map = L.map(mapContainer).setView([49.110849467180195, 3.0930300142048543], 13); // Initialise la carte

                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map); // Ajoute le calque de tuiles

                const marker = L.marker([49.110849467180195, 3.0930300142048543]).addTo(map); // Ajoute un marqueur à la carte
                marker.bindPopup('<b>O\'Coffee</b><br>Votre café préféré!').openPopup(); // Lien popup pour le marqueur
            }
        }
    }

    initMap(); // Appelle la fonction pour initialiser la carte
});