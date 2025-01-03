import User from './User.model.js';  // Modèle utilisateur
import Coffee from './Coffee.model.js'; // Modèle café
/* import Order from './Order.model.js'; // Modèle commande */

// Associations
User.hasMany(Coffee, {
    as: 'coffees', // Nom de la relation
    foreignKey: 'userId', // Clé étrangère dans la table Coffee
});

Coffee.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
});

/* // Association entre Order et User
User.hasMany(Order, {
    as: 'orders',
    foreignKey: 'userId',
});

Order.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
});

// Association entre Order et Coffee
Order.belongsTo(Coffee, {
    as: 'coffee',
    foreignKey: 'coffeeId',
});

Coffee.hasMany(Order, {
    as: 'orders',
    foreignKey: 'coffeeId',
}); */


export default { User, Coffee/* , Order */ }; // Export des modèles
