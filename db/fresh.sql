BEGIN;
DROP TABLE "user";
CREATE TABLE "user" (user_id SERIAL, user_name VARCHAR NOT NULL );
INSERT INTO "user" (user_id, user_name) VALUES (0, 'Andrew');
COMMIT;