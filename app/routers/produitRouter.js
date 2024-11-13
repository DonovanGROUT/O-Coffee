import express from 'express';
import { renderProduit } from '../controllers/produitController.js';

const router = express.Router();

router.get('/produit/:id', renderProduit);

export default router;