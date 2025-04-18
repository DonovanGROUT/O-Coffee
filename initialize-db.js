import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import client from './app/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initializeDatabase = async () => {
    try {
        console.log('Initializing database...');
        const sqlFile = path.join(__dirname, 'DB', 'db_create.sql');
        const sqlContent = fs.readFileSync(sqlFile, 'utf8');

        await client.query(sqlContent);
        console.log('Database initialized successfully!');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

export default initializeDatabase;