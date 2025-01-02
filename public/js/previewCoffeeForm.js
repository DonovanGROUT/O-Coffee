document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('coffeeImage');
    const imagePreview = document.getElementById('imagePreview');

    if (fileInput) {
        fileInput.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block'; // Affiche l'image
                }
                reader.readAsDataURL(file);
            } else {
                imagePreview.src = ""; // Réinitialise si aucun fichier
                imagePreview.style.display = 'none'; // Cache l'image
            }
        });
    }
});