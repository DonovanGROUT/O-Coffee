// Import des variables d'environnement !
import "dotenv/config";

// 
import express from "express";

// Import du router
import router from "./app/routers/mainRouter.js";

// Configuration du port
const PORT = process.env.PORT || 3000;

// Création de l'objet Express
const app = express();

// Ajouter la configuration du moteur de modèles
app.set("views", "./app/views"); // On indique le chemin vers les vues
app.set("view engine", "ejs"); // On indique le moteur de modèles utilisé

// Servir les fichiers statiques qui sont dans "public"
app.use(express.static("public"));


// Routage
app.use(router);

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
