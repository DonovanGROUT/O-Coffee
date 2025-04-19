// Import des variables d'environnement
import "dotenv/config";
// Import d'Express
import express from "express";
import session from "express-session";
import router from "./app/routers/mainRouter.js";
import authRouter from "./app/routers/authRouter.js";
import formRouter from "./app/routers/formRouter.js";
import cors from "cors";
import crypto from 'crypto'; // Module crypto pour générer des tokens aléatoires
import initializeDatabase from './initialize-db.js';

// Configuration du port
const PORT = process.env.PORT || 3000;

// Création de l'objet Express
const app = express();

// Configuration CORS
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? [/\.render\.com$/] // Accepte n'importe quel sous-domaine render.com en production
        : ['http://localhost:1234', 'http://localhost:3000'], // Domaines en développement
    methods: ['GET', 'POST', 'DELETE'], // Méthodes HTTP autorisées
    credentials: true, // Permet l'envoi de cookies
    allowedHeaders: ['Content-Type', 'Authorization', 'CSRF-Token'] // En-têtes autorisés
};
app.use(cors(corsOptions));

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour parser les données des formulaires
app.use(express.urlencoded({ extended: true }));

// Configuration de la session
const sessionParams = session({
    secret: process.env.SECRET_KEY, // Clé secrète pour signer le cookie de session
    resave: true, // Sauvegarde la session même si elle n'a pas été modifiée
    saveUninitialized: true, // Sauvegarde les sessions non initialisées
    cookie: {
        maxAge: 1000 * 60 * 60, // Durée de vie du cookie (1 heure)
        httpOnly: true, // Le cookie n'est pas accessible par JavaScript côté client
        secure: process.env.NODE_ENV === 'production', // Active en production avec HTTPS
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // Configuration pour les cookies cross-site
    },
});

app.use(sessionParams); // Utiliser le middleware de session

// LISTE DES CHEMINS EXEMPTÉS DE VÉRIFICATION CSRF
// On stocke cette liste dans l'app pour y accéder dans le middleware
app.locals.csrfExemptedRoutes = [
    '/api/emailjs-key',
    '/admin/add-coffee',
    '/admin/edit-coffee',
    '/login',
    '/signup'
];

// CSRF
app.use((req, res, next) => {
    // Les requêtes GET, HEAD, OPTIONS ne nécessitent pas de protection CSRF
    const safeHttpMethods = ['GET', 'HEAD', 'OPTIONS'];

    // Pour chaque nouvelle session, génère un token CSRF
    if (!req.session.csrfToken) {
        req.session.csrfToken = crypto.randomBytes(64).toString('hex');
    }

    // Rend le token disponible dans les vues
    res.locals.csrfToken = req.session.csrfToken;

    // Vérifie si la route fait partie des exemptées
    let isExempted = false;

    // Vérifie si la route actuelle commence par l'un des chemins exemptés
    for (const route of app.locals.csrfExemptedRoutes) {
        if (req.path.startsWith(route)) {
            isExempted = true;
            break;
        }
    }

    // Si c'est une requête multipart marquée, on saute la vérification CSRF pour le moment
    if (req.isMultipartRequest) {
        console.log("Requête multipart détectée, vérification CSRF reportée");
        return next();
    }

    // Vérifie le token CSRF pour les requêtes non sécurisées qui ne sont pas exemptées
    if (!safeHttpMethods.includes(req.method) && !isExempted) {
        // Récupère le token du corps de la requête ou des en-têtes
        const token = (req.body && req.body._csrf) || req.headers['csrf-token'];

        if (!token || token !== req.session.csrfToken) {
            console.error('Erreur CSRF: Token invalide ou manquant');
            console.error('Token reçu:', token);
            console.error('Token attendu:', req.session.csrfToken);
            console.error('Méthode:', req.method);
            console.error('Chemin:', req.path);
            console.error('Headers:', req.headers);
            console.error('Body keys:', req.body ? Object.keys(req.body) : null);
            return res.status(403).send('Forbidden - CSRF token invalide');
        }
    }

    next();
});

// Ajoute la configuration du moteur de modèles
app.set("views", "./app/views"); // On indique le chemin vers les vues
app.set("view engine", "ejs"); // On indique le moteur de modèles utilisé

// Middleware de sécurité pour les en-têtes HTTP
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff'); // Empêche le MIME-sniffing
    res.setHeader('X-XSS-Protection', '1; mode=block'); // Protection XSS pour les anciens navigateurs
    res.setHeader('X-Frame-Options', 'DENY'); // Empêche le clickjacking
    next();
});

// Servir les fichiers statiques qui sont dans "public"
app.use(express.static("public"));

// Initialisation de la base de données en production
if (process.env.NODE_ENV === 'production') {
    try {
        console.log('Production environment detected, initializing database...');
        await initializeDatabase();
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Routage
// 1. Placer formRouter en premier pour que la route de l'API EmailJS soit accessible sans authentification
app.use(formRouter);
// 2. Ensuite le routeur d'authentification
app.use(authRouter);
// 3. Enfin le routeur principal pour les autres routes
app.use(router);

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
