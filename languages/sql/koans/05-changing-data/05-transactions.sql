-- title: Transactions
-- intro: `BEGIN` starts a transaction: its changes all happen, at `COMMIT`, or none of them do, at `ROLLBACK`.
CREATE TABLE accounts (name TEXT, balance INTEGER);
INSERT INTO accounts VALUES ('Ada', 100), ('Alan', 50);
BEGIN;
UPDATE accounts SET balance = balance - 30 WHERE name = 'Ada';
UPDATE accounts SET balance = balance + 30 WHERE name = 'Alan';
ROLLBACK;

-- ROLLBACK undid both changes
SELECT balance FROM accounts WHERE name = 'Ada';
-- expect: ___

BEGIN;
UPDATE accounts SET balance = balance - 30 WHERE name = 'Ada';
UPDATE accounts SET balance = balance + 30 WHERE name = 'Alan';
COMMIT;

-- COMMIT kept them
SELECT balance FROM accounts WHERE name = 'Alan';
-- expect: ___

-- money moved, but none was made
SELECT sum(balance) FROM accounts;
-- expect: ___
