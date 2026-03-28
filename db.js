const { Pool } = require('pg');

const pool = new Pool({
  host: 'db.dcpazsnudcfmgkmsdqqv.supabase.co',
  user: 'postgres',
  password: 'SaImOn.agu1lheiro',
  database: 'postgres',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;