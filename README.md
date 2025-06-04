# O'Coffee

Site vitrine responsive fictif pour une boutique de café haut de gamme.

## 🚀 Fonctionnalités

- **Page d'accueil** : Présentation de l'entreprise et mise en avant des cafés
- **Catalogue** : Liste des cafés disponibles avec filtres par catégorie
- **Détails produit** : Informations détaillées sur chaque café
- **Notre boutique** : Carte interactive (Leaflet) et présentation du savoir-faire
- **Formulaire de contact** : Envoi de messages via EmailJS
- **Administration** : Gestion des cafés (ajout, modification, suppression)

## ⚙️ Technologies utilisées

- **Backend** : Node.js, Express.js, PostgreSQL
- **Frontend** : HTML5, CSS3, JavaScript, EJS
- **Authentification** : Express-session, Argon2
- **Autres** : Leaflet, EmailJS, Multer

## 📋 Prérequis

- Node.js (v14+)
- PostgreSQL
- npm

## 🛠️ Installation

1. Cloner le dépôt

   ```bash
   git clone https://github.com/DonovanGROUT/O-Coffee.git
   cd O-Coffee
   ```

2. Installer les dépendances

   ```bash
   npm install
   ```

3. Configurer les variables d'environnement

   ```bash
   cp .env.example .env
   # Complétez les variables dans le fichier .env
   ```

4. Initialiser la base de données

   ```bash
   psql -U postgres -f DB/db_create.sql
   ```

5. Lancer le serveur

   ```bash
   npm start
   ```

## 🌐 Déploiement
<!-- DEPLOY-LINK-START -->
L'application est déployée sur Render : [https://ocoffee-qg6r.onrender.com/](https://ocoffee-qg6r.onrender.com/)
<!-- DEPLOY-LINK-END -->

### Procédure de déploiement sur Render

1. **Créer un compte Render**
   - Rendez-vous sur [render.com](https://render.com) et inscrivez-vous ou connectez-vous

2. **Lier votre dépôt GitHub**
   - Dans le dashboard Render, cliquez sur "New" puis "Web Service"
   - Connectez votre compte GitHub et sélectionnez le dépôt O'Coffee

3. **Configurer le service web**
   - **Nom** : Donnez un nom à votre application (ex: "ocoffee")
   - **Runtime** : Sélectionnez "Node"
   - **Build Command** : `npm install`
   - **Start Command** : `npm start:prod`
   - **Plan** : Sélectionnez "Free"

4. **Configurer la base de données PostgreSQL**
   - Dans le dashboard Render, cliquez sur "New" puis "PostgreSQL"
   - Donnez un nom à votre base de données (ex: "ocoffee-db")
   - Conservez les paramètres par défaut et sélectionnez le plan "Free"
   - Notez l'URL de connexion fournie par Render

5. **Configurer les variables d'environnement**
   - Retournez à votre service web
   - Allez dans l'onglet "Environment"
   - Ajoutez les variables suivantes :
     - `NODE_ENV` : `production`
     - `PORT` : `10000` (ou la valeur par défaut de Render)
     - `SECRET_KEY` : Générez une clé aléatoire
     - `EMAILJS_PUBLIC_KEY` : Votre clé publique EmailJS
     - `PG_URL` : L'URL de connexion à votre base PostgreSQL créée précédemment

6. **Initialiser la base de données**
   - Connectez-vous à votre base de données PostgreSQL via l'interface Render
   - Exécutez les requêtes du fichier `DB/db_create.sql`

7. **Déclencher le déploiement**
   - Cliquez sur "Manual Deploy" puis "Deploy latest commit"
   - Render va construire et déployer automatiquement votre application

8. **Vérifier le déploiement**
   - Une fois le déploiement terminé, cliquez sur l'URL fournie par Render
   - Vérifiez que toutes les fonctionnalités de l'application fonctionnent correctement

### Utilisation du fichier render.yaml

Ce projet inclut un fichier `render.yaml` qui permet un déploiement automatisé :

```bash
# À la racine du projet
render blueprint apply
```

Cette commande va créer automatiquement le service web et la base de données selon la configuration définie dans le fichier `render.yaml`.

## 📝 Auteur

Donovan GROUT
