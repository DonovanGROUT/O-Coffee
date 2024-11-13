import express from 'express';
import accueilRouter from './accueilRouter.js';
import catalogueRouter from './catalogueRouter.js';
import notreBoutiqueRouter from './notreBoutiqueRouter.js';
import produitRouter from './produitRouter.js';
import { render404 } from '../controllers/errorController.js';

const router = express.Router();

// Utiliser les routeurs individuels
router.use(accueilRouter);
router.use(catalogueRouter);
router.use(notreBoutiqueRouter);
router.use(produitRouter);

// Gérer les erreurs 404
router.use(render404);

export default router;