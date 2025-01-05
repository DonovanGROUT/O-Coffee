import express from 'express';
import upload from '../../config/upload.js';
import {
    renderAdminPage,
    renderCoffeesList,
    renderAddCoffeeForm,
    addCoffee,
    renderEditCoffeeForm,
    updateCoffee,
    deleteCoffee
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/', renderAdminPage); // Page d'administration principale
router.get('/coffees', renderCoffeesList); // Liste des cafés pour l'admin
router.get('/add-coffee', renderAddCoffeeForm); // Formulaire d'ajout d'un café
router.post('/add-coffee', upload.single('coffeeImage'), addCoffee); // Ajout de l'image du café dans le formulaire
router.get('/edit-coffee/:id', renderEditCoffeeForm); // Formulaire d'édition d'un café
router.post('/edit-coffee/:id', upload.single('coffeeImage'), updateCoffee); // Edition de l'image du café dans le formulaire
router.delete('/delete-coffee/:id', deleteCoffee); // Suppression d'un café

export default router;