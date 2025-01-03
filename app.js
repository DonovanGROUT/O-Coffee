// Import des variables d'environnement !
import "dotenv/config";
// Import d'Express
import express from "express";
import session from "express-session";
import router from "./app/routers/mainRouter.js";
import authRouter from "./app/routers/authRouter.js";

// Configuration du port
const PORT = process.env.PORT || 3000;

// Création de l'objet Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour parser les données des formulaires
app.use(express.urlencoded({ extended: true }));

// Configuration de la session
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

app.use(sessionParams); // Utiliser le middleware de session

// Ajouter la configuration du moteur de modèles
app.set("views", "./app/views"); // On indique le chemin vers les vues
app.set("view engine", "ejs"); // On indique le moteur de modèles utilisé

// Servir les fichiers statiques qui sont dans "public"
app.use(express.static("public"));


// Routage
app.use(authRouter); // Router d'authentification avant le routeur principal
app.use(router);

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
