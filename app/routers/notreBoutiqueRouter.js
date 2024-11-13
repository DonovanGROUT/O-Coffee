import express from 'express';
import { renderNotreBoutique } from '../controllers/notreBoutiqueController.js';

const router = express.Router();

router.get('/notre-boutique', renderNotreBoutique);

export default router;