import { getViewConfig } from '../../config/viewConfig.js';
import Coffee from '../models/Coffee.model.js';
import { errorHandler } from '../middlewares/errorHandler.js';
import { render404 } from '../controllers/errorController.js';

// PAGE ADMIN GENERALE
export const renderAdminPage = (req, res) => {
    res.render('admin', getViewConfig('admin'));
};

// LISTE DES CAFES
export const renderCoffeesList = async (req, res) => {
    try {
        const coffees = await Coffee.findAll();
        res.render('admin/admin-coffees', {
            ...getViewConfig('coffeesList'),
            coffees
        });
    } catch (error) {
        return errorHandler(error, req, res);
    }
};

// AJOUT D'UN CAFE
export const renderAddCoffeeForm = (req, res) => {
    res.render('admin/add-coffee', getViewConfig('addCoffee'));
};

export const addCoffee = async (req, res) => {
    const { name, description, reference, origine, prix_au_kilo, caracteristique_principale } = req.body;
    const disponible = req.body.disponible === 'on';

    try {
        await Coffee.create({
            name,
            description,
            reference,
            origine,
            prix_au_kilo,
            caracteristique_principale,
            disponible
        });
        res.redirect('/admin/coffees');
    } catch (error) {
        return errorHandler(error, req, res);
    }
};

// EDITION D'UN CAFE
export const renderEditCoffeeForm = async (req, res) => {
    try {
        const coffee = await Coffee.findByPk(req.params.id);

        if (!coffee) {
            return render404(req, res);
        }

        res.render('admin/edit-coffee', {
            ...getViewConfig('editCoffee'),
            coffee
        });
    } catch (error) {
        return errorHandler(error, req, res);
    }
};

export const updateCoffee = async (req, res) => {
    const { name, description, reference, origine, prix_au_kilo, caracteristique_principale } = req.body;
    const disponible = req.body.disponible === 'on';
    const id = req.params.id;

    try {
        const coffee = await Coffee.findByPk(id);

        if (!coffee) {
            return render404(req, res);
        }

        await coffee.update({
            name,
            description,
            reference,
            origine,
            prix_au_kilo,
            caracteristique_principale,
            disponible
        });

        res.redirect('/admin/coffees');
    } catch (error) {
        return errorHandler(error, req, res);
    }
};

// SUPPRESSION D'UN CAFE
export const deleteCoffee = async (req, res) => {
    try {
        const coffee = await Coffee.findByPk(req.params.id);

        if (!coffee) {
            return render404(req, res);
        }

        await coffee.destroy();

        res.json({ success: true });
    } catch (error) {
        return errorHandler(error, req, res);
    }
};
