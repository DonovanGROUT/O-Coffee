import { Router } from "express";
import authController from "../controllers/authController.js";

const authRouter = Router();

// Routes publiques
authRouter.get("/signup", authController.getSignUpPage);
authRouter.post("/signup", authController.handleSignUpSubmissionForm);
authRouter.get("/login", authController.getLoginPage);
authRouter.post("/login", authController.handleLoginFormSubmission);

// Route pour la déconnexion
authRouter.get("/logout", authController.handleLogout);

export default authRouter;
