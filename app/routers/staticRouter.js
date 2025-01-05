// Imports
import express from 'express';
import { renderAccueil, renderNotreBoutique } from '../controllers/staticController.js';

const router = express.Router();

// Route pour afficher la page d'accueil
router.get('/', renderAccueil);

// Route pour afficher la page "notre boutique"
router.get('/notre-boutique', renderNotreBoutique);

export default router;
