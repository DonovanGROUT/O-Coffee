document.addEventListener('DOMContentLoaded', async () => {
    // Récupération de la clé EmailJS de manière sécurisée via une API interne
    const response = await fetch('/api/emailjs-key'); // Effectue une requête pour obtenir la clé EmailJS
    const emailjsKey = await response.text(); // Récupère la clé sous forme de texte
    emailjs.init(emailjsKey); // Initialise EmailJS avec la clé récupérée

    // Sélectionne le formulaire de contact et les éléments pour afficher les messages d'erreur et de succès
    const contactForm = document.getElementById('contact-form'); // Sélectionne le formulaire par son ID
    const errorMessage = document.getElementById('error-message'); // Sélectionne l'élément pour afficher les messages d'erreur
    const successMessage = document.getElementById('success-message'); // Sélectionne l'élément pour afficher les messages de succès

    if (contactForm) { // Vérifie si le formulaire existe sur la page
        // Ajoute un écouteur d'événements pour l'envoi du formulaire
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Empêche le rechargement de la page lors de l'envoi du formulaire

            const serviceID = 'service_8zzf4dd'; // ID du service EmailJS
            const templateID = 'template_os2ts7f'; // ID du modèle d'email à utiliser

            // Masque les messages d'erreur et de succès avant l'envoi
            errorMessage.classList.add('hidden');
            successMessage.classList.add('hidden');

            try {
                // Envoie le formulaire via EmailJS
                const result = await emailjs.sendForm(serviceID, templateID, contactForm);

                // Si l'envoi est réussi, affiche un message de succès
                successMessage.textContent = 'Message envoyé avec succès !';
                successMessage.classList.remove('hidden'); // Affiche le message de succès
                contactForm.reset(); // Réinitialise le formulaire après envoi
            } catch (err) {
                // En cas d'erreur lors de l'envoi, affiche un message d'erreur
                errorMessage.textContent = 'Erreur lors de l\'envoi du message.';
                errorMessage.classList.remove('hidden'); // Affiche le message d'erreur
            }
        });
    }
});