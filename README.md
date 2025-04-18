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

L'application est déployée sur Render : [https://ocoffee.onrender.com](https://ocoffee.onrender.com)

## 📝 Auteur

Donovan GROUT
