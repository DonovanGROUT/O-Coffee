import dataMapper from '../dataMapper.js';

export const renderCatalogue = async (req, res) => {
    try {
        const category = req.query.category; // Récupère la catégorie depuis l'URL
        const showAll = req.query.all === 'true'; // Vérifie si le paramètre "all" est présent dans l'URL
        let coffees; // Variable pour stocker les cafés

        // Récupère les cafés en fonction des paramètres de requête
        if (category) {
            coffees = await dataMapper.getCoffeesByCategory(category); // Récupère les cafés par catégorie
        } else if (showAll) {
            coffees = await dataMapper.getAllCoffees(); // Récupère tous les cafés
        } else {
            coffees = await dataMapper.getLatestCoffees(3); // Récupère les 3 derniers cafés par défaut
        }
        const categories = await dataMapper.getAllCategories(); // Récupère toutes les catégories

        // Rend la vue du catalogue avec les données nécessaires
        res.render('catalogue', {
            title: "O'Coffee - Catalogue",
            description: "Découvrez notre catalogue de cafés d'exception chez O'Coffee.",
            stylesheets: ['/css/style-catalogue.css'],
            coffees, // Passe les cafés à la vue
            categories, // Passe les catégories à la vue
            selectedCategory: category // Passe la catégorie sélectionnée à la vue
        });
    } catch (error) {
        console.error('Erreur lors du rendu de la page catalogue:', error);
        res.status(500).send("Oups, le serveur a fait tomber les cafés !");
    }
};