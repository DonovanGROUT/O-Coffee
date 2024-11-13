import dataMapper from '../dataMapper.js';

export const renderCatalogue = async (req, res) => {
    try {
        const coffees = await dataMapper.getAllCoffees(); // Récupère tous les cafés
        res.render('catalogue', {
            title: "O'Coffee - Catalogue",
            description: "Découvrez notre catalogue de cafés d'exception chez O'Coffee.",
            stylesheets: ['/css/style-catalogue.css'],
            coffees // Passe les cafés à la vue
        });
    } catch (error) {
        console.error('Erreur lors du rendu de la page catalogue:', error);
        res.status(500).send("Oups, le serveur a fait tomber les cafés !");
    }
};