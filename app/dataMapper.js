import client from "./database.js";

const dataMapper = {};

dataMapper.getAllCoffees = async () => {
    try {
        const result = await client.query('SELECT * FROM coffee');
        return result.rows;
    } catch (error) {
        console.error('Erreur lors de la récupération des cafés:', error);
        throw error; // Lève l'erreur pour que le contrôleur puisse la gérer
    }
};

dataMapper.getCoffeeById = async (id) => {
    try {
        const result = await client.query('SELECT * FROM coffee WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error(`Erreur lors de la récupération du café avec l'ID ${id}:`, error);
        throw error; // Lève l'erreur
    }
};

export default dataMapper;