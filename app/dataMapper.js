// Import du client depuis database.js
import client from "./database.js";

const dataMapper = {
    getAllCoffees: async () => {
        const result = await client.query('SELECT * FROM coffee'); // Récupère tous les cafés
        return result.rows; // Retourne les lignes du résultat
    },

    getCoffeeById: async (id) => {
        const result = await client.query(`SELECT * FROM coffee WHERE id = $1;`, [id]); // Récupère un café par ID
        return result.rows[0]; // Retourne le premier résultat
    },

    getLatestCoffees: async (limit) => {
        const result = await client.query('SELECT * FROM coffee ORDER BY id DESC LIMIT $1;', [limit]); // Récupère les derniers cafés selon la limite spécifiée
        return result.rows;
    },

    getCoffeesByCategory: async (category) => {
        const result = await client.query('SELECT * FROM coffee WHERE caracteristique_principale = $1;', [category]); // Récupère les cafés par catégorie
        return result.rows;
    },

    getAllCategories: async () => {
        const result = await client.query('SELECT DISTINCT caracteristique_principale FROM coffee;'); // Récupère toutes les catégories distinctes
        return result.rows.map(row => row.caracteristique_principale); // Retourne un tableau des catégories
    },

    addCoffee: async (coffeeData) => {
        const { name, description, reference, origine, prix_au_kilo, caracteristique_principale, disponible } = coffeeData;
        await client.query(
            'INSERT INTO coffee (name, description, reference, origine, prix_au_kilo, caracteristique_principale, disponible, date_ajout) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)',
            [name, description, reference, origine, prix_au_kilo, caracteristique_principale, disponible]
        );
    },

    updateCoffee: async (id, coffeeData) => {
        const { name, description, reference, origine, prix_au_kilo, caracteristique_principale, disponible } = coffeeData;
        await client.query(
            'UPDATE coffee SET name = $1, description = $2, reference = $3, origine = $4, prix_au_kilo = $5, caracteristique_principale = $6, disponible = $7 WHERE id = $8',
            [name, description, reference, origine, prix_au_kilo, caracteristique_principale, disponible, id]
        );
    },

    deleteCoffee: async (id) => {
        await client.query('DELETE FROM coffee WHERE id = $1', [id]);
    }
};
// Exporte par défaut le dataMapper
export default dataMapper;