CREATE TABLE users (email TEXT NOT NULL UNIQUE, age INTEGER CHECK (age >= 0));
INSERT INTO users VALUES ('ada@example.org', 36);

-- NOT NULL refuses a missing email
INSERT INTO users VALUES (NULL, 20);
-- expect: error: NOT NULL

-- UNIQUE refuses a repeat
INSERT INTO users VALUES ('ada@example.org', 40);
-- expect: error: UNIQUE

-- CHECK refuses a negative age
INSERT INTO users VALUES ('alan@example.org', -1);
-- expect: error: CHECK

-- and nothing was added
SELECT count(*) FROM users;
-- expect: 1
