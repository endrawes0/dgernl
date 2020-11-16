BEGIN;
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "question";
DROP TYPE IF EXISTS "response";

CREATE TABLE "user" (user_id SERIAL, user_name VARCHAR NOT NULL );
CREATE TYPE "response" AS ENUM ('short', 'long', 'scale');
CREATE TABLE "question" (question_id SERIAL, prompt VARCHAR NOT NULL, response_type response);

INSERT INTO "user" (user_name) VALUES ('Andrew');
INSERT INTO "question" (prompt, response_type) VALUES ('dirt dirt dur dirt dirt?', 'short');
COMMIT;