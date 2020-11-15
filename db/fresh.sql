BEGIN;
CREATE TABLE "user" (user_id INT, user_name VARCHAR NOT NULL );
INSERT INTO "user" (user_id, user_name) VALUES (0, 'Andrew');
COMMIT;