import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { renderAccueil } from "../controllers/accueilController.js";
import { renderCatalogue } from "../controllers/catalogueController.js";
import { renderNotreBoutique } from "../controllers/notreBoutiqueController.js";
import { renderProduit } from "../controllers/produitController.js";
import adminRouter from "./adminRouter.js";
import client from "../database.js";

const authRouter = Router();

// Middleware pour protéger les routes admin
const isLoggedMiddleware = (req, res, next) => {
    console.log("Session user:", req.session.user);
    if (!req.session.user) {
        return res.redirect("/login"); // Redirige vers la page de connexion si pas connecté
    }
    next();
};

// Middleware pour vérifier si l'utilisateur est un administrateur
const isAdminMiddleware = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        console.log("Tentative d'accès non autorisée à une page admin par:", req.session.user ? req.session.user.email : "utilisateur non connecté");
        return res.status(403).render('403', {
            title: "O'Coffee - Accès refusé",
            description: "Vous n'avez pas les autorisations nécessaires pour accéder à cette page.",
            stylesheets: ['/css/style-404.css']
        });
    }
    next();
};

// Route de débogage pour voir la session
authRouter.get("/debug-session", (req, res) => {
    res.json({
        sessionExists: req.session ? true : false,
        sessionID: req.sessionID,
        sessionUser: req.session.user || null,
        sessionCookie: req.session.cookie || null
    });
});

// Route temporaire pour supprimer un utilisateur par email (à supprimer après utilisation)
authRouter.get("/delete-user/:email", async (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email);
        const result = await client.query('DELETE FROM users WHERE email = $1', [email]);

        if (result.rowCount > 0) {
            // Si l'utilisateur est supprimé, détruire également sa session
            if (req.session.user && req.session.user.email === email) {
                req.session.destroy();
            }
            res.json({ success: true, message: `Utilisateur avec l'email ${email} supprimé avec succès` });
        } else {
            res.json({ success: false, message: `Aucun utilisateur trouvé avec l'email ${email}` });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route temporaire pour supprimer TOUS les utilisateurs et réinitialiser les sessions
// ATTENTION: À utiliser uniquement en développement, jamais en production!
authRouter.get("/reset-all-users", async (req, res) => {
    try {
        // Supprime tous les utilisateurs de la base de données
        const result = await client.query('DELETE FROM users');

        // Détruit la session actuelle
        req.session.destroy();

        res.json({
            success: true,
            message: `${result.rowCount} utilisateurs ont été supprimés de la base de données. Toutes les sessions ont été invalidées.`,
            note: "Pour une purge complète des sessions, redémarrez le serveur."
        });
    } catch (error) {
        console.error('Erreur lors de la réinitialisation des utilisateurs:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route pour promouvoir un utilisateur en administrateur (facilite le test)
authRouter.get("/promote-admin/:email", async (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email);
        const result = await client.query("UPDATE users SET role = 'admin' WHERE email = $1 RETURNING *", [email]);

        if (result.rowCount > 0) {
            // Si l'utilisateur actuel est promu, mettre à jour sa session
            if (req.session.user && req.session.user.email === email) {
                req.session.user.role = 'admin';
            }
            res.json({
                success: true,
                message: `L'utilisateur ${email} a été promu administrateur`,
                user: result.rows[0]
            });
        } else {
            res.json({ success: false, message: `Aucun utilisateur trouvé avec l'email ${email}` });
        }
    } catch (error) {
        console.error('Erreur lors de la promotion de l\'utilisateur:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Routes publiques
authRouter.get("/signup", authController.getSignUpPage);
authRouter.post("/signup", authController.handleSignUpSubmissionForm);
authRouter.get("/login", authController.getLoginPage);
authRouter.post("/login", authController.handleLoginFormSubmission);
authRouter.get("/", renderAccueil);
authRouter.get("/catalogue", renderCatalogue);
authRouter.get("/notre-boutique", renderNotreBoutique);
authRouter.get("/produit/:id", renderProduit);

// Routes protégées (connexion requise)
authRouter.use(isLoggedMiddleware);

// Routes admin (connexion ET rôle admin requis)
// Application du middleware de vérification du rôle admin à toutes les routes /admin/*
authRouter.use('/admin', isAdminMiddleware);
authRouter.use(adminRouter);

export default authRouter;
