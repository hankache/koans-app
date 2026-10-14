CREATE TABLE accounts (name TEXT, balance INTEGER);
INSERT INTO accounts VALUES ('Ada', 100), ('Alan', 50);
BEGIN;
UPDATE accounts SET balance = balance - 30 WHERE name = 'Ada';
UPDATE accounts SET balance = balance + 30 WHERE name = 'Alan';
ROLLBACK;

-- ROLLBACK undid both changes
SELECT balance FROM accounts WHERE name = 'Ada';
-- expect: 100

BEGIN;
UPDATE accounts SET balance = balance - 30 WHERE name = 'Ada';
UPDATE accounts SET balance = balance + 30 WHERE name = 'Alan';
COMMIT;

-- COMMIT kept them
SELECT balance FROM accounts WHERE name = 'Alan';
-- expect: 80

-- money moved, but none was made
SELECT sum(balance) FROM accounts;
-- expect: 150
