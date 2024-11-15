// Imports
import express from 'express';
import { renderNotreBoutique } from '../controllers/notreBoutiqueController.js';

const router = express.Router();

// Route pour afficher la page "notre boutique"
router.get('/notre-boutique', renderNotreBoutique);

export default router;