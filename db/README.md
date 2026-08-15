# Support database

SQLite schema and starter data for the Customer Support function.

```bash
sqlite3 support.db < schema.sql
sqlite3 support.db < seed.sql
sqlite3 support.db "SELECT ticket_id, priority, subject FROM tickets WHERE status = 'escalated';"
```

If `sqlite3` is not installed, keep using `schema.sql` + `seed.sql` as the source of truth, or load them in any SQL engine that accepts this dialect.

The live dashboard uses the same starter figures (see `assets/data.js`).
