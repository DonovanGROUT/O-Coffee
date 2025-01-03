// Objet de configuration pour éviter de se répéter 
const viewConfig = {
    // Administration
    admin: {
        title: "Administration",
        description: "Page d'administration",
        stylesheets: ['/css/style-admin.css']
    },
    coffeesList: {
        title: "Gestion des cafés",
        description: "Liste des cafés pour l'administration",
        stylesheets: ['/css/style-admin.css']
    },
    addCoffee: {
        title: "Ajouter un café",
        description: "Formulaire pour ajouter un nouveau café.",
        stylesheets: ['/css/style-admin.css']
    },
    editCoffee: {
        title: "Modifier un café",
        description: "Formulaire pour modifier un café existant.",
        stylesheets: ['/css/style-admin.css']
    },
    // Accueil
    accueil: {
        title: "O'Coffee - Accueil",
        description: "Découvrez notre sélection de cafés d'exception chez O'Coffee.",
        stylesheets: ['/css/style-accueil.css']
    },
    // Connexion
    login: {
        title: "Connexion",
        description: "Page de connexion pour accéder à l'administration.",
        stylesheets: ['/css/style-admin.css']
    },
    // Inscription
    signup: {
        title: "Inscription",
        description: "Page d'inscription pour créer un compte.",
        stylesheets: ['/css/style-admin.css']
    },
    // 404
    error404: {
        title: "O'Coffee - Page non trouvée, c'est fort de café ça !",
        description: "Page non trouvée au café O'Coffee",
        stylesheets: ['/css/style-404.css']
    }
};

// Fonction pour obtenir la configuration par type
export const getViewConfig = (type) => {
    return viewConfig[type] || {};
};
