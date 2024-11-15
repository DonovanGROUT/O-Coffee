/* Imports */
import express from 'express';
import { renderProduit } from '../controllers/produitController.js';

const router = express.Router();

// Route pour afficher la page produit avec un ID spécifique
router.get('/produit/:id', renderProduit);

export default router;