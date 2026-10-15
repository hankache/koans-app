CREATE TABLE accounts (name TEXT, balance INTEGER);
CREATE TABLE audit (name TEXT, old INTEGER, new INTEGER);
CREATE TRIGGER log_changes AFTER UPDATE OF balance ON accounts
BEGIN
  INSERT INTO audit VALUES (new.name, old.balance, new.balance);
END;
CREATE TRIGGER no_overdraft BEFORE UPDATE OF balance ON accounts WHEN new.balance < 0
BEGIN
  SELECT RAISE(ABORT, 'overdraft');
END;
INSERT INTO accounts VALUES ('ada', 100);
UPDATE accounts SET balance = 60 WHERE name = 'ada';

-- the trigger kept a log
SELECT old, new FROM audit;
-- expect: 100, 60

-- the other refuses an overdraft
UPDATE accounts SET balance = -1 WHERE name = 'ada';
-- expect: error: overdraft

-- so the balance is unchanged
SELECT balance FROM accounts;
-- expect: 60
