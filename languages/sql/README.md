# SQL

Learn SQL from `SELECT` to window functions, through 72 koans. They run on
[sql.js](https://github.com/sql-js/sql.js): SQLite, compiled to WebAssembly, about 0.7 MB.

**Try it:** [koans.app/sql/](https://koans.app/sql/)

## The path

| #  | Group                     | Koans | Covers |
|---:|---------------------------|------:|--------|
| 1  | Awakening                 | 8     | first queries, tables, `WHERE`, `NULL`, `ORDER BY` and `LIMIT`, `IN` and `BETWEEN`, aliases, sorting `NULL`s |
| 2  | Expressions and functions | 12    | numbers and types, strings, `LIKE` and `GLOB`, `CASE`, dates, type affinity, arithmetic functions, `coalesce` and `nullif`, more string functions, date arithmetic, collation, math functions |
| 3  | Grouping                  | 8     | aggregates, `GROUP BY`, `HAVING`, `DISTINCT`, `group_concat`, `FILTER`, pivoting, `NULL`s in aggregates |
| 4  | Joins                     | 9     | inner, left, self and cross joins, set operations, joins with aggregates, semi- and anti-joins, `USING`, many-to-many |
| 5  | Changing data             | 10    | `INSERT`/`UPDATE`/`DELETE`, constraints, keys, upserts, transactions, `INSERT … SELECT` and `UPDATE … FROM`, `RETURNING`, defaults and generated columns, `ALTER TABLE`, indexes |
| 6  | Subqueries and CTEs       | 6     | subqueries, `WITH`, recursive CTEs, correlated subqueries, `EXISTS` and `IN`, hierarchies |
| 7  | Window functions          | 7     | window functions, ranking, frames, `lag` and `lead`, partitions, value functions, `ROWS`/`GROUPS`/`RANGE` and `EXCLUDE` |
| 8  | SQLite features           | 5     | JSON, `json_each`, views, triggers, `STRICT` tables |
| 9  | Puzzles                   | 7     | top N per group, gaps and islands, duplicates, a calendar, a running balance, the second highest, the median |

## How the tests are written

SQL has no shared test framework (pgTAP, tSQLt and utPLSQL each belong to one database), so a test
is a query followed by the rows it should return, in a comment. That's the idea behind
[sqllogictest](https://sqlite.org/sqllogictest/doc/trunk/about.wiki), the cross-engine format that
SQLite and DuckDB test themselves with, written here so that it reads as plain SQL:

```sql
-- the oldest person
SELECT name FROM people ORDER BY age DESC LIMIT 1;
-- expect: 'Grace'
```

- **Expected rows** are written as SQL values: one row as `'Ada', 36`, several as
  `('Ada', 36), ('Alan', 41)`, and none as `nothing`. SQLite works them out itself (it runs them as
  `VALUES`), so expressions like `1.0 / 3` work. A single value that starts with `(` goes in a row
  of its own: `((1 + 2) * 3)`.
- **A statement that should fail** expects `error`, or `error: <part of its message>`, matched
  regardless of case.
- **The comment just above** a query is its description, shown with the test's result.
- **A blank** can be anywhere in a tested query (`ORDER BY age ___`) or in its expectation
  (`-- expect: ___`). A test that still has a blank fails without running.
- **A query that fails**, a typo in a column name for instance, fails its test with SQLite's
  message, and the koan carries on.
- **A statement without an expectation** just runs: that's how a koan sets up its tables. A
  `SELECT` without one prints its rows, so learners can look at the data. If such a statement
  fails, the koan stops there, at its line, like an uncaught error.
- **Every run starts from a fresh, empty database.**

## How a koan runs

The worker, [public/runtime/sql/worker.js](../../public/runtime/sql/worker.js), splits the koan
into statements itself, so it knows each one's lines, description and expectation. It keeps the
`;` inside strings, quoted names, comments and trigger bodies. It prints the same TAP as every
other language's tests, so there's no prelude.

Node imports the same worker for `check:koans` and `npm test`.

## Rules for SQL blanks

These replace the general rule that a blank must be an assertion's argument:

- A blank goes in a statement that has an `-- expect:` comment, or in the comment itself.
  `npm run check:koans` rejects one anywhere else.
- When several rows are expected, the query needs `ORDER BY`: without it, SQL promises no order.
  `npm run check:koans` rejects one without.
- Keep the blank on one line: the test is reported on the line that has it.
- A description must not look like a header line (`-- word: …`) at the top of the koan.

## Files

```
node.mjs            SQL for the build tools: lint, running sql.js under Node
pack.ts             SQL for the app: wording, look, worker, highlighting, error format
runtime.lock.json   the pinned sql.js version and the checksums of its files
tap.test.ts         how the app reads the worker's real output
koans/              the koans
```

## Interpreter

sql.js comes from the [`sql.js`](https://www.npmjs.com/package/sql.js) npm package, whose many
builds aren't worth installing: `npm run fetch-runtime` downloads its tarball from the registry,
checks it against the registry's integrity hash and [runtime.lock.json](runtime.lock.json), and
takes out `sql-wasm.js` and `sql-wasm.wasm`. To move to a newer version:

```sh
npm run fetch-runtime -- --lang sql --update        # the latest, or: --update 1.15.0
npm run check:koans -- --lang sql
npm test
```

## Known limitations

- It's SQLite's SQL: types are flexible, and some features of other databases, such as stored
  procedures, differ or are missing.
- Each run starts from an empty database, so a koan creates the tables it uses.
