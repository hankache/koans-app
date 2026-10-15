CREATE TABLE cities (city TEXT, country TEXT);
CREATE TABLE weather (city TEXT, temp INTEGER);
INSERT INTO cities VALUES ('Paris', 'France'), ('Lyon', 'France'), ('Oslo', 'Norway');
INSERT INTO weather VALUES ('Paris', 18), ('Oslo', 9);

-- join on the column both tables have
SELECT city, country, temp FROM cities JOIN weather USING (city) ORDER BY temp;
-- expect: ('Oslo', 'Norway', 9), ('Paris', 'France', 18)

-- how many columns come back: city once
SELECT count(*) FROM pragma_table_info('cities');
-- expect: 2

-- NATURAL JOIN uses every column the tables share
SELECT count(*) FROM cities NATURAL JOIN weather;
-- expect: 2
