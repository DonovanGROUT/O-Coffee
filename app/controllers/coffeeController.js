import { getViewConfig } from '../../config/viewConfig.js';
import Coffee from '../models/Coffee.model.js';
import { errorHandler } from '../middlewares/errorHandler.js';

// Vue du catalogue complet
export const renderCatalogue = async (req, res) => {
    try {
        const category = req.query.category;
        const showAll = req.query.all === 'true';
        let coffees;

        if (category) {
            coffees = await Coffee.findAll({
                where: { caracteristique_principale: category }
            });
        } else if (showAll) {
            coffees = await Coffee.findAll();
        } else {
            coffees = await Coffee.findAll({
                order: [['created_at', 'DESC']],
                limit: 3
            });
        }

        const categories = await Coffee.findAll({
            attributes: [[Coffee.sequelize.fn('DISTINCT', Coffee.sequelize.col('caracteristique_principale')), 'caracteristique_principale']],
            raw: true
        });

        res.render('catalogue', {
            ...getViewConfig('catalogue'),
            coffees,
            categories: categories.map(c => c.caracteristique_principale),
            selectedCategory: category
        });
    } catch (error) {
        console.error('Erreur lors du rendu de la page catalogue:', error);
        return errorHandler(error, req, res);
    }
};

// Vue d'un produit sélectionné
export const renderProduit = async (req, res) => {
    const productId = req.params.id;

    try {
        const coffee = await Coffee.findByPk(productId);

        if (!coffee) {
            return errorHandler({ status: 404, message: 'Café non trouvé' }, req, res);
        }

        // Convertit le prix au kilo en float
        coffee.prix_au_kilo = parseFloat(coffee.prix_au_kilo);

        // Convertit la date pour l'affichage
        coffee.created_at_formatted = coffee.created_at
            ? new Date(coffee.created_at).toLocaleDateString('fr-FR')
            : 'Date non disponible';

        res.render('produit', {
            ...getViewConfig('produit', coffee.name, coffee.description),
            coffee: { // Convertit l'instance Sequelize en objet JSON
                ...coffee.toJSON(),
                created_at_formatted: coffee.created_at_formatted
            }
        });
    } catch (error) {
        console.error(`Erreur lors du rendu du produit avec l'ID ${productId}:`, error);
        return errorHandler(error, req, res);
    }
};
