BEGIN;

-- Créer le type ENUM si ce n'est pas déjà fait
DO $$ 
BEGIN 
    CREATE TYPE role AS ENUM ('member', 'admin'); 
EXCEPTION 
    WHEN duplicate_object THEN 
        -- Ignore l'erreur si le type existe déjà
END $$;

-- Ajouter la colonne "role" uniquement si elle n'existe pas
DO $$ 
BEGIN 
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" role DEFAULT 'member'; 
EXCEPTION 
    WHEN duplicate_column THEN 
        -- Ignore l'erreur si la colonne existe déjà
END $$;

COMMIT;
