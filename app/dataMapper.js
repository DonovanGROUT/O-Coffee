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
    }
};
// Exporte par défaut le dataMapper
export default dataMapper;