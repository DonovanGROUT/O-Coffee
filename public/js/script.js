document.addEventListener('DOMContentLoaded', () => {
    // Menu burger
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Boutons "Lire plus/Lire moins"
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const fullContent = document.querySelector(`#${targetId} .full-content`);
            if (fullContent) {
                fullContent.classList.toggle('hidden');
                button.textContent = fullContent.classList.contains('hidden') ? 'Lire plus' : 'Lire moins';
            }
        });
    });

    // Filtre par catégorie
    const categorySelect = document.getElementById('categorie');
    if (categorySelect) {
        categorySelect.addEventListener('change', function (event) {
            const selectedCategory = event.currentTarget.value;
            let url = '/catalogue';

            if (selectedCategory) {
                url += '?category=' + encodeURIComponent(selectedCategory);
            }
            window.location.href = url;
        });
    }

    // Carte interactive Leaflet
    const mapContainer = document.getElementById('map'); // Vérifiez si cet élément existe
    if (mapContainer) {
        // Initialisation de la carte uniquement si le conteneur existe
        const map = L.map(mapContainer).setView([49.110849467180195, 3.0930300142048543], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const marker = L.marker([49.110849467180195, 3.0930300142048543]).addTo(map);
        marker.bindPopup('<b>O\'Coffee</b><br>Votre café préféré!').openPopup();
    } else {
        console.error("Le conteneur de la carte n'a pas été trouvé.");
    }

    // Formulaire de contact

    // Initialiser EmailJS avec la clé publique
    emailjs.init('PThmmi2nBn22pWB17');

    const contactForm = document.getElementById('contact-form');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Empêche le rechargement de la page

            const serviceID = 'service_8zzf4dd'; // ID de service EmailJS
            const templateID = 'template_os2ts7f'; // ID de modèle EmailJS

            // Réinitialiser les messages d'erreur et de succès
            errorMessage.classList.add('hidden');
            successMessage.classList.add('hidden');

            // Essayer d'envoyer le formulaire
            const result = await emailjs.sendForm(serviceID, templateID, contactForm);

            // Vérifier si l'envoi a réussi
            if (result) {
                successMessage.textContent = 'Message envoyé avec succès !';
                successMessage.classList.remove('hidden'); // Afficher le message de succès
                contactForm.reset(); // Réinitialise le formulaire
            }
        });
    }
});