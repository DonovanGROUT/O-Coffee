/* Import du dataMapper */
import dataMapper from '../dataMapper.js';

export const renderProduit = async (req, res) => {
    // Récupère l'ID du produit depuis les paramètres de l'URL
    const productId = req.params.id;

    try {
        const coffee = await dataMapper.getCoffeeById(productId); // Récupère le café par ID

        // Vérifie si le café existe
        if (!coffee) {
            return res.status(404).render('404', {
                title: "O'Coffee - Café non trouvé", // Titre pour la page 404
                description: "Le café que vous recherchez n'existe pas.", // Description pour la page 404
                stylesheets: ['/css/style-404.css'] // Feuille de style pour la page 404
            });
        }

        // Convertit le prix au kilo en float
        coffee.prix_au_kilo = parseFloat(coffee.prix_au_kilo);

        // Rend la vue du produit
        res.render('produit', {
            title: `O'Coffee - ${coffee.name}`, // Titre dynamique basé sur le nom du produit
            description: coffee.description,
            stylesheets: ['/css/style-produit.css'], // Feuille de style spécifique à cette page
            coffee // Passe le café à la vue
        });
    } catch (error) {
        console.error(`Erreur lors du rendu du produit avec l'ID ${productId}:`, error); // Log l'erreur dans la console
        res.status(500).send("Oups, le serveur a fait tomber les cafés !"); // Message d'erreur personnalisé pour l'utilisateur
    }
};