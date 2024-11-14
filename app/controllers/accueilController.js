import dataMapper from '../dataMapper.js';

export const renderAccueil = async (req, res) => {
    try {
        const coffees = await dataMapper.getLatestCoffees(3); // Récupère les 3 derniers cafés
        res.render('accueil', {
            title: "O'Coffee - Accueil",
            description: "Découvrez notre sélection de cafés d'exception chez O'Coffee.",
            stylesheets: ['/css/style-accueil.css'],
            coffees // Passe les cafés à la vue
        });
    } catch (error) {
        console.error('Erreur lors du rendu de la page d\'accueil:', error);
        res.status(500).send("Oups, le serveur a fait tomber les cafés !");
    }
};