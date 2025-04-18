// Middleware pour marquer les routes qui utilisent multer
export const markMultipartRequest = (req, res, next) => {
    req.isMultipartRequest = true;
    next();
};

// Middleware CSRF post-multer pour vérifier le token dans les requêtes multipart
export const verifyCSRFToken = (req, res, next) => {
    // Si ce n'est pas une requête multipart, on a déjà vérifié
    if (!req.isMultipartRequest) {
        return next();
    }

    // Récupérer le token du corps de la requête (maintenant disponible grâce à multer)
    const token = req.body._csrf;

    if (!token || token !== req.session.csrfToken) {
        console.error('Erreur CSRF post-multer: Token invalide ou manquant');
        console.error('Token reçu:', token);
        console.error('Token attendu:', req.session.csrfToken);
        return res.status(403).send('Forbidden - CSRF token invalide (post-multer)');
    }

    // Si tout va bien, on continue
    next();
};