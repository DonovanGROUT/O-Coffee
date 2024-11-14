import client from "./database.js";

const dataMapper = {
    getAllCoffees: async () => {
        const result = await client.query('SELECT * FROM coffee');
        return result.rows;
    },

    getCoffeeById: async (id) => {
        const result = await client.query(`SELECT * FROM coffee WHERE id = $1;`, [id]);
        return result.rows[0];
    },

    getLatestCoffees: async (limit) => {
        const result = await client.query('SELECT * FROM coffee ORDER BY id DESC LIMIT $1;', [limit]);
        return result.rows;
    },

    getCoffeesByCategory: async (category) => {
        const result = await client.query('SELECT * FROM coffee WHERE caracteristique_principale = $1;', [category]);
        return result.rows;
    },

    getAllCategories: async () => {
        const result = await client.query('SELECT DISTINCT caracteristique_principale FROM coffee;');
        return result.rows.map(row => row.caracteristique_principale);
    }
};

export default dataMapper;