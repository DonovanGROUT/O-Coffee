// Imports
import express from 'express';
import { renderCatalogue, renderProduit } from '../controllers/coffeeController.js';

const router = express.Router();

// Route pour afficher le catalogue
router.get('/catalogue', renderCatalogue);

// Route pour afficher la page produit avec un ID spécifique
router.get('/produit/:id', renderProduit);

export default router;
