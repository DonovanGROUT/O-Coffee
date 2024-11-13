import dataMapper from '../dataMapper.js';

export const renderProduit = async (req, res) => {
    const productId = req.params.id;
    try {
        const coffee = await dataMapper.getCoffeeById(productId); // Récupère le café par ID
        if (!coffee) {
            return res.status(404).render('404', {
                title: "O'Coffee - Café non trouvé",
                description: "Le café que vous recherchez n'existe pas.",
                stylesheets: ['/css/style-404.css']
            });
        }
        coffee.prix_au_kilo = parseFloat(coffee.prix_au_kilo);
        res.render('produit', {
            title: `O'Coffee - ${coffee.name}`,
            description: coffee.description,
            stylesheets: ['/css/style-produit.css'],
            coffee // Passe le café à la vue
        });
    } catch (error) {
        console.error(`Erreur lors du rendu du produit avec l'ID ${productId}:`, error);
        res.status(500).send("Oups, le serveur a fait tomber les cafés !");
    }
};