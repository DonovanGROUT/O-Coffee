import dataMapper from '../dataMapper.js';

// PAGE ADMIN GENERALE
export const renderAdminPage = (req, res) => {
    res.render('admin', {
        title: "Administration",
        description: "Page d'administration",
        stylesheets: ['/css/style-admin.css']
    });
};

// LISTE DES CAFES

export const renderCoffeesList = async (req, res) => {
    try {
        const coffees = await dataMapper.getAllCoffees();
        res.render('admin/admin-coffees', {
            title: "Gestion des cafés",
            description: "Liste des cafés pour l'administration",
            stylesheets: ['/css/style-admin.css'],
            coffees
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des cafés:', error);
        res.status(500).send("Erreur lors de la récupération des cafés.");
    }
};

// AJOUT D'UN CAFE

export const renderAddCoffeeForm = (req, res) => {
    res.render('admin/add-coffee', {
        title: "Ajouter un café",
        description: "Formulaire pour ajouter un nouveau café.",
        stylesheets: ['/css/style-admin.css']
    });
};

export const addCoffee = async (req, res) => {
    const { name, description, reference, origine, prix_au_kilo, caracteristique_principale } = req.body;
    const disponible = req.body.disponible === 'on';

    try {
        await dataMapper.addCoffee({
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
        console.error('Erreur lors de l\'ajout du café:', error);
        res.status(500).send("Erreur lors de l'ajout du café.");
    }
};

// EDITION D'UN CAFE

export const renderEditCoffeeForm = async (req, res) => {
    try {
        const coffee = await dataMapper.getCoffeeById(req.params.id);
        res.render('admin/edit-coffee', {
            title: "Modifier un café",
            description: "Formulaire pour modifier un café existant.",
            stylesheets: ['/css/style-admin.css'],
            coffee
        });
    } catch (error) {
        console.error('Erreur lors de la récupération du café:', error);
        res.status(500).send("Erreur lors de la récupération du café.");
    }
};

export const updateCoffee = async (req, res) => {
    const { name, description, reference, origine, prix_au_kilo, caracteristique_principale } = req.body;
    const disponible = req.body.disponible === 'on';
    const id = req.params.id;

    try {
        await dataMapper.updateCoffee(id, {
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
        console.error('Erreur lors de la modification du café:', error);
        res.status(500).send("Erreur lors de la modification du café.");
    }
};

// SUPPRESSION D'UN CAFE

export const deleteCoffee = async (req, res) => {
    try {
        await dataMapper.deleteCoffee(req.params.id);
        res.json({ success: true });
    } catch (error) {
        console.error('Erreur lors de la suppression du café:', error);
        res.status(500).json({ success: false, error: "Erreur lors de la suppression du café." });
    }
};

