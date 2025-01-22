document.addEventListener('DOMContentLoaded', () => {

    console.log('DOM chargé');
    const deleteModal = document.getElementById('delete-modal');
    console.log('Modal trouvée :', deleteModal);

    // Vérification robuste de l'existence des éléments
    if (!document.body.contains(document.getElementById('delete-modal'))) {
        console.log('Éléments de suppression non trouvés, script ignoré.');
        return; // Sortie précoce si les éléments n'existent pas
    }

    const deleteButtons = document.querySelectorAll('.delete-btn');
    const confirmDeleteButton = document.getElementById('confirm-delete');
    const cancelDeleteButton = document.getElementById('cancel-delete');

    let coffeeIdToDelete = null;

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            coffeeIdToDelete = button.dataset.id; // Stocke l'ID du café à supprimer
            deleteModal.classList.remove('hidden'); // Affiche la modale
        });
    });

    confirmDeleteButton.addEventListener('click', async () => {
        try {
            const response = await fetch(`/admin/delete-coffee/${coffeeIdToDelete}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.success) {
                document.querySelector(`.delete-btn[data-id="${coffeeIdToDelete}"]`).closest('.coffee-card').remove();
                deleteModal.classList.add('hidden'); // Cache la modale après suppression
            } else {
                alert('Erreur lors de la suppression du café');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la suppression du café');
        }
    });
    cancelDeleteButton.addEventListener('click', () => {
        deleteModal.classList.add('hidden'); // Cache la modale si l'utilisateur annule
        coffeeIdToDelete = null; // Réinitialise l'ID du café
    });
});