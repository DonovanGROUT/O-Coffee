import express from 'express';
import { renderAccueil } from '../controllers/accueilController.js';

const router = express.Router();

// Route pour afficher la page d'accueil
router.get('/', renderAccueil);

export default router;