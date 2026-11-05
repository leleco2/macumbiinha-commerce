PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS users (
 id TEXT PRIMARY KEY,
 email TEXT NOT NULL UNIQUE,
 password_salt TEXT NOT NULL,
 password_hash TEXT NOT NULL,
 role TEXT NOT NULL DEFAULT 'admin' CHECK(role IN ('admin','agent')),
 created_at TEXT NOT NULL DEFAULT (datetime('now')),
 updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS sessions (
 token_hash TEXT PRIMARY KEY,
 user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 expires_at INTEGER NOT NULL,
 created_at INTEGER NOT NULL DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS sessions_expiration_idx ON sessions(expires_at);
CREATE TABLE IF NOT EXISTS contacts (
 id TEXT PRIMARY KEY,
 name TEXT NOT NULL,
 phone TEXT NOT NULL DEFAULT '',
 email TEXT NOT NULL DEFAULT '',
 segment TEXT NOT NULL DEFAULT 'varejo' CHECK(segment IN ('varejo','atacado')),
 status TEXT NOT NULL DEFAULT 'lead' CHECK(status IN ('lead','cliente')),
 origin TEXT NOT NULL DEFAULT 'manual' CHECK(origin IN ('manual','site','whatsapp')),
 notes TEXT NOT NULL DEFAULT '',
 created_at TEXT NOT NULL DEFAULT (datetime('now')),
 updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS contacts_updated_idx ON contacts(updated_at DESC);
CREATE INDEX IF NOT EXISTS contacts_phone_idx ON contacts(phone);
CREATE TABLE IF NOT EXISTS deals (
 id TEXT PRIMARY KEY,
 contact_id TEXT NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
 title TEXT NOT NULL,
 amount_cents INTEGER NOT NULL DEFAULT 0 CHECK(amount_cents>=0),
 stage TEXT NOT NULL DEFAULT 'novo' CHECK(stage IN ('novo','contato','negociacao','ganho','perdido')),
 origin TEXT NOT NULL DEFAULT 'manual' CHECK(origin IN ('manual','site','whatsapp')),
 notes TEXT NOT NULL DEFAULT '',
 created_at TEXT NOT NULL DEFAULT (datetime('now')),
 updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS deals_stage_idx ON deals(stage,updated_at DESC);
CREATE INDEX IF NOT EXISTS deals_contact_idx ON deals(contact_id);
CREATE TABLE IF NOT EXISTS tasks (
 id TEXT PRIMARY KEY,
 title TEXT NOT NULL,
 description TEXT NOT NULL DEFAULT '',
 due_date TEXT,
 contact_id TEXT REFERENCES contacts(id) ON DELETE SET NULL,
 deal_id TEXT REFERENCES deals(id) ON DELETE SET NULL,
 completed INTEGER NOT NULL DEFAULT 0 CHECK(completed IN (0,1)),
 created_at TEXT NOT NULL DEFAULT (datetime('now')),
 updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS tasks_due_idx ON tasks(completed,due_date);
CREATE TABLE IF NOT EXISTS activities (
 id TEXT PRIMARY KEY,
 contact_id TEXT REFERENCES contacts(id) ON DELETE SET NULL,
 deal_id TEXT REFERENCES deals(id) ON DELETE SET NULL,
 user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
 kind TEXT NOT NULL CHECK(kind IN ('sistema','nota','cliente','oportunidade','tarefa','integracao')),
 summary TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS activities_recent_idx ON activities(created_at DESC);
CREATE TABLE IF NOT EXISTS integration_events (
 event_id TEXT PRIMARY KEY,
 contact_id TEXT REFERENCES contacts(id) ON DELETE SET NULL,
 deal_id TEXT REFERENCES deals(id) ON DELETE SET NULL,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS audit_events (
 id TEXT PRIMARY KEY,
 actor_id TEXT REFERENCES users(id) ON DELETE SET NULL,
 action TEXT NOT NULL,
 target_id TEXT,
 ip_hash TEXT,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
