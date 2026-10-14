CREATE TABLE visits (page TEXT PRIMARY KEY, count INTEGER);
INSERT INTO visits VALUES ('home', 1);
INSERT INTO visits VALUES ('home', 1) ON CONFLICT (page) DO UPDATE SET count = count + 1;

-- the second insert updated the row instead
SELECT count FROM visits WHERE page = 'home';
-- expect: 2

INSERT OR IGNORE INTO visits VALUES ('home', 100);

-- OR IGNORE left it alone
SELECT count FROM visits WHERE page = 'home';
-- expect: 2

-- a new page is simply inserted
INSERT INTO visits VALUES ('about', 1) ON CONFLICT (page) DO UPDATE SET count = count + 1 RETURNING count;
-- expect: 1
