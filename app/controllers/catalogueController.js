import dataMapper from '../dataMapper.js';

export const renderCatalogue = async (req, res) => {
    try {
        const category = req.query.category; // Récupère la catégorie depuis l'URL
        let coffees;
        if (category) {
            coffees = await dataMapper.getCoffeesByCategory(category);
        } else {
            coffees = await dataMapper.getAllCoffees(); // Récupère tous les cafés si pas de catégorie sélectionnée
        }
        const categories = await dataMapper.getAllCategories(); // Récupère toutes les catégories
        res.render('catalogue', {
            title: "O'Coffee - Catalogue",
            description: "Découvrez notre catalogue de cafés d'exception chez O'Coffee.",
            stylesheets: ['/css/style-catalogue.css'],
            coffees, // Passe les cafés à la vue
            categories, // Passe les catégories à la vue
            selectedCategory: category
        });
    } catch (error) {
        console.error('Erreur lors du rendu de la page catalogue:', error);
        res.status(500).send("Oups, le serveur a fait tomber les cafés !");
    }
};