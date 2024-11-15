/* Imports */
import express from 'express';
import { renderCatalogue } from '../controllers/catalogueController.js';

const router = express.Router();

// Route pour afficher le catalogue
router.get('/catalogue', renderCatalogue);

export default router;