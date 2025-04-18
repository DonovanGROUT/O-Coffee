import express from 'express';
import { markMultipartRequest, verifyCSRFToken } from '../../config/csrf.js';
import upload from '../../config/upload.js';
import { renderAdminPage, renderCoffeesList, renderAddCoffeeForm, addCoffee, renderEditCoffeeForm, updateCoffee, deleteCoffee } from '../controllers/adminController.js';

const router = express.Router();

router.get('/admin', renderAdminPage);
// Page d'administration principale
router.get('/admin/coffees', renderCoffeesList);
// Liste des cafés pour l'admin
router.get('/admin/add-coffee', renderAddCoffeeForm);
// Formulaire d'ajout d'un café
router.post('/admin/add-coffee', markMultipartRequest, upload.single('coffeeImage'), verifyCSRFToken, addCoffee);
// Ajout de l'image du café dans le formulaire
router.get('/admin/edit-coffee/:id', renderEditCoffeeForm);
// Formulaire d'édition d'un café
router.post('/admin/edit-coffee/:id', markMultipartRequest, upload.single('coffeeImage'), verifyCSRFToken, updateCoffee);
// Edition de l'image du café dans le formulaire
router.delete('/admin/delete-coffee/:id', deleteCoffee);
// Suppression d'un café

export default router;