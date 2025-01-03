import Coffee from '../models/Coffee.model.js';
import { Op } from 'sequelize';

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
            title: "O'Coffee - Catalogue",
            description: "Découvrez notre catalogue de cafés d'exception chez O'Coffee.",
            stylesheets: ['/css/style-catalogue.css'],
            coffees,
            categories: categories.map(c => c.caracteristique_principale),
            selectedCategory: category
        });
    } catch (error) {
        console.error('Erreur lors du rendu de la page catalogue:', error);
        res.status(500).send("Oups, le serveur a fait tomber les cafés !");
    }
};
