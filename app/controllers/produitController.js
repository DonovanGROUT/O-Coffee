import Coffee from '../models/Coffee.model.js';

export const renderProduit = async (req, res) => {
    const productId = req.params.id;

    try {
        const coffee = await Coffee.findByPk(productId);

        if (!coffee) {
            return res.status(404).render('404', {
                title: "O'Coffee - Café non trouvé",
                description: "Le café que vous recherchez n'existe pas.",
                stylesheets: ['/css/style-404.css']
            });
        }

        // Convertit le prix au kilo en float si nécessaire
        coffee.prix_au_kilo = parseFloat(coffee.prix_au_kilo);

        // Convertit la date pour l'affichage
        if (coffee.created_at) {
            coffee.created_at_formatted = new Date(coffee.created_at).toLocaleDateString('fr-FR');
        } else {
            coffee.created_at_formatted = 'Date non disponible';
        }

        res.render('produit', {
            title: `O'Coffee - ${coffee.name}`,
            description: coffee.description,
            stylesheets: ['/css/style-produit.css'],
            coffee: { ...coffee.toJSON(), created_at_formatted: coffee.created_at_formatted } // Convertit l'instance Sequelize en objet JSON
        });
    } catch (error) {
        console.error(`Erreur lors du rendu du produit avec l'ID ${productId}:`, error);
        res.status(500).send("Oups, le serveur a fait tomber les cafés !");
    }
};
