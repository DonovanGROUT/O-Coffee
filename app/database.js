// Importation du module pg pour interagir avec PostgreSQL
import pg from 'pg';

// Création d'un client PostgreSQL avec l'URL de connexion depuis les variables d'environnement
const client = new pg.Client(process.env.PG_URL);

// Connexion au client PostgreSQL
await client.connect();

// Exportation du client connecté pour utilisation dans d'autres fichiers
export default client;
