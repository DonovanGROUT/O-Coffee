import express from 'express';
import { renderCatalogue } from '../controllers/catalogueController.js';

const router = express.Router();

router.get('/catalogue', renderCatalogue);

export default router;