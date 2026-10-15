-- title: Removing duplicates
-- intro: To delete duplicate rows but keep one of each, keep the smallest `rowid` per group of identical values.
CREATE TABLE emails (address TEXT);
INSERT INTO emails VALUES ('a@x.org'), ('b@x.org'), ('a@x.org'), ('c@x.org'), ('b@x.org');

-- how many are duplicates
SELECT count(*) - count(DISTINCT address) FROM emails;
-- expect: ___

DELETE FROM emails WHERE rowid NOT IN (SELECT min(rowid) FROM emails GROUP BY address);

-- one of each is left
SELECT address FROM emails ORDER BY address;
-- expect: ___
