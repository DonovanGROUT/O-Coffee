BEGIN;
CREATE TYPE role AS ENUM ('member', 'admin');
ALTER TABLE "users" ADD COLUMN "role" role DEFAULT 'member';
COMMIT;
