/* Réflexion pour pousser O'Coffee vers un site e-commerce => 
gestion des cafés pour l'inventaire, mais aussi des utilisateurs/clients
et des commandes ! La liaison de ces trois tables permettra 
de gérer les données liées au commerce.*/

BEGIN;

-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS "orders";
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "coffee";

-- Table pour les cafés
CREATE TABLE IF NOT EXISTS "coffee" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "reference" VARCHAR(50) NOT NULL UNIQUE,
    "origine" VARCHAR(100) NOT NULL,
    "prix_au_kilo" DECIMAL(10, 2) NOT NULL,
    "caracteristique_principale" VARCHAR(100) NOT NULL,
    "disponible" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour les utilisateurs/clients
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "firstname" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(20) DEFAULT 'member',
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table pour les commandes
CREATE TABLE IF NOT EXISTS "orders" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES users(id) ON DELETE CASCADE,
    "coffee_id" INT REFERENCES coffee(id) ON DELETE CASCADE,
    "quantity" INT NOT NULL,
    "order_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

set client_encoding to utf8;

-- Insertion des données dans la table coffee
INSERT INTO "coffee" ("name", "description", "reference", "origine", "prix_au_kilo", "caracteristique_principale", "disponible") VALUES
('Espresso', 'Café fort et concentré préparé en faisant passer de l''eau chaude à travers du café finement moulu.', '100955890', 'Italie', 20.99, 'Corsé', TRUE),
('Columbian', 'Café moyennement corsé avec une acidité vive et une saveur riche.', '100955894', 'Colombie', 18.75, 'Acide', TRUE),
('Ethiopian Yirgacheffe', 'Réputé pour son arôme floral, son acidité vive et ses notes de saveur citronnée.', '105589090', 'Éthiopie', 22.50, 'Fruité', TRUE),
('Brazilian Santos', 'Café doux et lisse avec un profil de saveur de noisette.', '134009550', 'Brésil', 17.80, 'Doux', TRUE),
('Guatemalan Antigua', 'Café corsé avec des nuances chocolatées et une pointe d''épice.', '256505890', 'Guatemala', 21.25, 'Corsé', TRUE),
('Kenyan AA', 'Café complexe connu pour son acidité rappelant le vin et ses saveurs fruitées.', '295432730', 'Kenya', 23.70, 'Acide', TRUE),
('Sumatra Mandheling', 'Café profond et terreux avec un corps lourd et une faible acidité.', '302932754', 'Indonésie', 19.95, 'Corsé', TRUE),
('Costa Rican Tarrazu', 'Café vif et net avec une finition propre et une acidité vive.', '327302954', 'Costa Rica', 24.50, 'Acide', TRUE),
('Vietnamese Robusta', 'Café audacieux et fort avec une saveur robuste distinctive.', '549549090', 'Vietnam', 16.75, 'Épicé', TRUE),
('Tanzanian Peaberry', 'Acidité vive avec un profil de saveur rappelant le vin et un corps moyen.', '582954954', 'Tanzanie', 26.80, 'Fruité', TRUE),
('Jamaican Blue Mountain', 'Reconnu pour sa saveur douce, son acidité vive et son absence d''amertume.', '589100954', 'Jamaïque', 39.25, 'Doux', TRUE),
('Rwandan Bourbon', 'Café avec des notes florales prononcées, une acidité vive et un corps moyen.', '650753915', 'Rwanda', 21.90, 'Fruité', TRUE),
('Panamanian Geisha', 'Café rare aux arômes floraux complexes, une acidité brillante et un profil de saveur distinctif.', '795501340', 'Panama', 42.00, 'Fruité', TRUE),
('Peruvian Arabica', 'Café équilibré avec des notes de chocolat, une acidité modérée et un corps velouté.', '954589100', 'Pérou', 19.40, 'Chocolaté', FALSE),
('Hawaiian Kona', 'Café rare au goût riche, une acidité douce et des nuances subtiles.', '958090105', 'Hawaï', 55.75, 'Doux', FALSE),
('Nicaraguan Maragogipe', 'Café avec des notes de fruits, une acidité vive et un corps plein.', '691550753', 'Nicaragua', 28.60, 'Fruité', FALSE);

-- Insertion des comptes utilisateur par défaut
-- Mots de passe hashés avec argon2 (les mots de passe en clair sont 'Admin123' et 'Member123')
INSERT INTO "users" ("firstname", "lastname", "email", "password", "role") VALUES
('Donovan', 'GROUT', 'donovan.grout.pro@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$EGc6Sim3BJNMlZlfy6Uwyg$d/guzHCtNi954ssgQG0r74gn8dlsilejVZMDVooZxK8', 'admin'),
('Client', 'Standard', 'groutdonovan@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$EE6RP/RwE4TmopQ3uuU8RQ$/om8Z40eCfbo+Wqfg9SYUrIXDi9C83Xj8aAP55qp4pc', 'member');

COMMIT;