document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            if (confirm('Êtes-vous sûr de vouloir supprimer ce café ?')) {
                const coffeeId = button.dataset.id;
                try {
                    const response = await fetch(`/admin/delete-coffee/${coffeeId}`, {
                        method: 'DELETE',
                        headers: {
                            'CSRF-Token': csrfToken // Ajout du token CSRF dans les en-têtes
                        }
                    });
                    const result = await response.json();
                    if (result.success) {
                        button.closest('.coffee-card').remove();
                    } else {
                        alert('Erreur lors de la suppression du café');
                    }
                } catch (error) {
                    console.error('Erreur:', error);
                    alert('Erreur lors de la suppression du café');
                }
            }
        });
    });
});