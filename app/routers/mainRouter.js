// Imports
import express from 'express';
import staticRouter from './staticRouter.js';
import coffeeRouter from './coffeeRouter.js';
import formRouter from './formRouter.js';
import authRouter from './authRouter.js';
import adminRouter from './adminRouter.js';
import isLoggedMiddleware from '../middlewares/authMiddleware.js';
import { errorHandler } from '../middlewares/errorHandler.js';

const router = express.Router();

// Utilise les routeurs individuels
router.use('/', staticRouter);
router.use('/', coffeeRouter);
router.use('/', formRouter);
router.use('/', authRouter);

router.use('/admin', isLoggedMiddleware, adminRouter);

// Gestion des erreurs 404 (route non trouvée)
router.use((req, res, next) => {
    return errorHandler({ status: 404, message: 'Page non trouvée' }, req, res, next);
});


export default router;