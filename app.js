// Imports
import "dotenv/config";
import express from "express";
import router from "./app/routers/mainRouter.js";
import { errorHandler } from './app/middlewares/errorHandler.js';
import sequelize from './app/database.js';
import './app/models/User.model.js';
import './app/models/Coffee.model.js';
import './app/models/associations.js';
import sessionParams from './config/sessionConfig.js';
import expressLayouts from 'express-ejs-layouts';

// Configuration du port
const PORT = process.env.PORT || 3000;

// Création de l'objet Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour parser les données des formulaires
app.use(express.urlencoded({ extended: true }));

app.use(sessionParams); // Utilise le middleware de session

// Middleware qui passe la variable user à toutes les vues
app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Passez l'utilisateur à toutes les vues
    next();
});

// Ajoute la configuration du moteur de modèles
app.set("views", "./app/views"); // On indique le chemin vers les vues
app.set("view engine", "ejs"); // On indique le moteur de modèles utilisé

// Configuration d'express-ejs-layouts
app.use(expressLayouts);
app.set('layout', './partials/layout');

// Sert les fichiers statiques qui sont dans "public"
app.use(express.static("public"));

// Routage
app.use(router);

// Gestion des erreurs
app.use(errorHandler);

// Vérification de la connexion à la base de données
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données réussie.');
        // Synchronisation avec la base de données avant le lancement du serveur
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erreur lors de la connexion à la base de données:', err);
    });