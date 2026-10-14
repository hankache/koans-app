-- title: Constraints
-- intro: Constraints are rules a table enforces: `NOT NULL`, `UNIQUE`, `CHECK`. A statement that would break one fails, which the koans expect with `-- expect: error`.
CREATE TABLE users (email TEXT NOT NULL UNIQUE, age INTEGER CHECK (age >= 0));
INSERT INTO users VALUES ('ada@example.org', 36);

-- NOT NULL refuses a missing email
INSERT INTO users VALUES (NULL, 20);
-- expect: error: ___

-- UNIQUE refuses a repeat
INSERT INTO users VALUES ('ada@example.org', 40);
-- expect: error: ___

-- CHECK refuses a negative age
INSERT INTO users VALUES ('alan@example.org', -1);
-- expect: error: ___

-- and nothing was added
SELECT count(*) FROM users;
-- expect: ___
