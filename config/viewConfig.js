// Fonction pour factoriser l'objet de configuration
const createViewConfig = (title, description, stylesheets) => ({
    title,
    description,
    stylesheets
});

const commonStyles = {
    admin: ['/css/style-admin.css'],
};

// Objet de configuration pour éviter de se répéter 
const viewConfig = {
    // Administration
    admin: createViewConfig(
        "Administration",
        "Page d'administration",
        commonStyles.admin
    ),
    coffeesList: createViewConfig(
        "Gestion des cafés",
        "Liste des cafés pour l'administration",
        commonStyles.admin
    ),
    addCoffee: createViewConfig(
        "Ajouter un café",
        "Formulaire pour ajouter un nouveau café.",
        commonStyles.admin
    ),
    editCoffee: createViewConfig(
        "Modifier un café",
        "Formulaire pour modifier un café existant.",
        commonStyles.admin
    ),
    // Accueil
    accueil: createViewConfig(
        "O'Coffee - Accueil",
        "Découvrez notre sélection de cafés d'exception chez O'Coffee.",
        ['/css/style-accueil.css']
    ),
    // Catalogue
    catalogue: createViewConfig(
        "O'Coffee - Catalogue",
        "Découvrez notre catalogue de cafés d'exception chez O'Coffee.",
        ['/css/style-catalogue.css']
    ),
    // Boutique
    boutique: createViewConfig(
        "O'Coffee - Notre Boutique",
        "Découvrez l'histoire et l'ambiance unique de notre boutique O'Coffee.",
        ['/css/style-notre-boutique.css']
    ),
    // Produit
    produit: (coffeeName, coffeeDescription) => createViewConfig(
        `O'Coffee - ${coffeeName || 'Détail du produit'}`,
        coffeeDescription || "Découvrez notre café d'exception",
        ['/css/style-produit.css']
    ),
    // Authentification
    // Connexion
    login: createViewConfig(
        "Connexion",
        "Page de connexion pour accéder à l'administration.",
        commonStyles.admin
    ),
    // Inscription
    signup: createViewConfig(
        "Inscription",
        "Page d'inscription pour créer un compte.",
        commonStyles.admin
    ),
    // Erreurs
    // 404
    error404: createViewConfig(
        "O'Coffee - Page non trouvée, c'est fort de café ça !",
        "Page non trouvée au café O'Coffee",
        ['/css/style-404.css']
    )
};

// Fonction pour obtenir la configuration par type
export const getViewConfig = (type, ...args) => {
    const config = viewConfig[type];
    if (typeof config === 'function') {
        return config(...args);
    } else if (config) {
        return config;
    } else {
        return {};
    }
};
