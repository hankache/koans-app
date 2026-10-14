-- title: Upsert
-- intro: `INSERT … ON CONFLICT DO UPDATE` inserts a row, or updates the one already there; `INSERT OR IGNORE` skips a row that would conflict.
CREATE TABLE visits (page TEXT PRIMARY KEY, count INTEGER);
INSERT INTO visits VALUES ('home', 1);
INSERT INTO visits VALUES ('home', 1) ON CONFLICT (page) DO UPDATE SET count = count + 1;

-- the second insert updated the row instead
SELECT count FROM visits WHERE page = 'home';
-- expect: ___

INSERT OR IGNORE INTO visits VALUES ('home', 100);

-- OR IGNORE left it alone
SELECT count FROM visits WHERE page = 'home';
-- expect: ___

-- a new page is simply inserted
INSERT INTO visits VALUES ('about', 1) ON CONFLICT (page) DO UPDATE SET count = count + 1 RETURNING count;
-- expect: ___
