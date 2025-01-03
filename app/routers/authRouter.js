import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { renderAccueil } from "../controllers/accueilController.js";
import { renderCatalogue } from "../controllers/catalogueController.js";
import { renderNotreBoutique } from "../controllers/notreBoutiqueController.js";
import { renderProduit } from "../controllers/produitController.js";
import adminRouter from "./adminRouter.js";

const authRouter = Router();

// Middleware pour protéger les routes admin
const isLoggedMiddleware = (req, res, next) => {
    console.log("Session user:", req.session.user);
    if (!req.session.user) {
        return res.redirect("/login"); // Redirige vers la page de connexion si pas connecté
    }
    next();
};

// Routes publiques
authRouter.get("/signup", authController.getSignUpPage);
authRouter.post("/signup", authController.handleSignUpSubmissionForm);
authRouter.get("/login", authController.getLoginPage);
authRouter.post("/login", authController.handleLoginFormSubmission);
authRouter.get("/", renderAccueil);
authRouter.get("/catalogue", renderCatalogue);
authRouter.get("/notre-boutique", renderNotreBoutique);
authRouter.get("/produit/:id", renderProduit);

// Routes protégées (admin)
authRouter.use(isLoggedMiddleware); // Applique le middleware uniquement aux routes suivantes

// Toutes les routes du adminRouter.js seront protégées : 
authRouter.use(adminRouter);

// Ajouter d'autres routes admin ici

export default authRouter;
