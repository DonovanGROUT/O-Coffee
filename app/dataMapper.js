// Import du client depuis database.js
import client from "./database.js";
// Import des modèles Sequelize
import Coffee from "./models/Coffee.model.js";
import User from "./models/User.model.js";

const dataMapper = {
    getAllCoffees: async () => {
        return await Coffee.findAll();
    },

    getCoffeeById: async (id) => {
        return await Coffee.findByPk(id);
    },

    getLatestCoffees: async (limit) => {
        return await Coffee.findAll({
            order: [['id', 'DESC']],
            limit: limit
        });
    },

    getCoffeesByCategory: async (category) => {
        return await Coffee.findAll({
            where: { caracteristique_principale: category }
        });
    },

    getAllCategories: async () => {
        return await Coffee.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('caracteristique_principale')), 'caracteristique_principale']],
            raw: true
        });
    },

    addCoffee: async (coffeeData) => {
        return await Coffee.create(coffeeData);
    },

    updateCoffee: async (id, coffeeData) => {
        const coffee = await Coffee.findByPk(id);
        if (coffee) {
            return await coffee.update(coffeeData);
        }
        return null;
    },

    deleteCoffee: async (id) => {
        const coffee = await Coffee.findByPk(id);
        if (coffee) {
            await coffee.destroy();
        }
    }
};
// Exporte par défaut le dataMapper
export default dataMapper;