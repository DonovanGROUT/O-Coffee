// Toujours commencer par importer les variables d'environnement !
import "dotenv/config";

import express from "express";

// on importe le router
import router from "./app/routers/mainRouter.js";

// un peu de config
const PORT = process.env.PORT || 3000;

const app = express();

// Ajouter la configuration du moteur de modèles
app.set("views", "./app/views"); // On indique le chemin vers les vues
app.set("view engine", "ejs"); // On indique le moteur de modèles utilisé

// servir les fichiers statiques qui sont dans "public"
app.use(express.static("public"));


// routage !
app.use(router);

// on lance le serveur
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
