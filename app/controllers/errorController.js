import { getViewConfig } from '../../config/viewConfig.js';

export const render404 = (req, res) => {
    res.status(404).render('404', getViewConfig('error404'));
};

// Middleware pour gérer les erreurs 404
export const handle404 = (req, res) => {
    res.status(404).json({ success: false, error: "Page non trouvée." });
};