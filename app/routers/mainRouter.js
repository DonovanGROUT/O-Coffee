// Imports
import express from 'express';
import accueilRouter from './accueilRouter.js';
import catalogueRouter from './catalogueRouter.js';
import notreBoutiqueRouter from './notreBoutiqueRouter.js';
import produitRouter from './produitRouter.js';
// formRouter est maintenant importé directement dans app.js
import adminRouter from './adminRouter.js';
import { render404 } from '../controllers/errorController.js';

const router = express.Router();

// Utilise les routeurs individuels
router.use(accueilRouter);
router.use(catalogueRouter);
router.use(notreBoutiqueRouter);
router.use(produitRouter);
// formRouter est maintenant utilisé directement dans app.js
router.use(adminRouter);

// Gère les erreurs 404
router.use(render404);

// Export par défaut de l'objet router
export default router;