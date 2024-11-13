import express from 'express';
import { renderAccueil } from '../controllers/accueilController.js';

const router = express.Router();

router.get('/', renderAccueil);

export default router;