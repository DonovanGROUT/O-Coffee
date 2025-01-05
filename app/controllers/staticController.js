import { getViewConfig } from '../../config/viewConfig.js';
import Coffee from '../models/Coffee.model.js';
import { errorHandler } from '../middlewares/errorHandler.js';

export const renderAccueil = async (req, res) => {
    try {
        // Récupère les 3 derniers cafés
        const coffees = await Coffee.findAll({
            order: [['created_at', 'DESC']],
            limit: 3
        });

        // Rend la vue d'accueil
        res.render('accueil', {
            ...getViewConfig('accueil'),
            coffees // Passe les cafés à la vue
        });
    } catch (error) {
        return errorHandler(error, req, res);
    }
};

export const renderNotreBoutique = (req, res) => {
    res.render('notre-boutique', {
        ...getViewConfig('boutique'),
    });
};
