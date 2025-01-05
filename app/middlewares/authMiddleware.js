// Middleware pour protéger les routes admin
const isLoggedMiddleware = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login"); // Redirige vers la page de connexion si pas connecté
    }
    next();
};

export default isLoggedMiddleware;