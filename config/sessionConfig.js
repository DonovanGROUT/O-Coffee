import session from 'express-session';

const sessionParams = session({
    secret: process.env.SECRET_KEY, // Clé secrète pour signer le cookie de session
    resave: false, // Ne pas sauvegarder la session si elle n'a pas été modifiée
    saveUninitialized: false, // Ne pas sauvegarder une session non initialisée
    cookie: {
        maxAge: 1000 * 60 * 60, // Durée de vie du cookie (1 heure)
        httpOnly: true, // Le cookie n'est pas accessible par JavaScript côté client
        secure: false, // À mettre à true en production avec HTTPS
    },
});

export default sessionParams;