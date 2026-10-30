CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT);
CREATE TABLE enrolments (student_id INTEGER, course_id INTEGER, PRIMARY KEY (student_id, course_id));
INSERT INTO students VALUES (1, 'Ada'), (2, 'Alan');
INSERT INTO courses VALUES (1, 'Logic'), (2, 'Poetry'), (3, 'Machines');
INSERT INTO enrolments VALUES (1, 1), (1, 2), (2, 1), (2, 3);

-- Ada's courses
SELECT c.title FROM enrolments e JOIN courses c ON c.id = e.course_id JOIN students s ON s.id = e.student_id WHERE s.name = 'Ada' ORDER BY c.title;
-- expect: ('Logic'), ('Poetry')

-- how many students take each course
SELECT c.title, count(e.student_id) FROM courses c LEFT JOIN enrolments e ON e.course_id = c.id GROUP BY c.id ORDER BY c.title;
-- expect: ('Logic', 2), ('Machines', 1), ('Poetry', 1)

-- the pair is the key, so nobody enrolls twice
INSERT INTO enrolments VALUES (1, 1);
-- expect: error: UNIQUE
