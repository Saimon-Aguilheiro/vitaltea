const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, postgresql://postgres:[SaImOn.agu1lheiro]@db.dcpazsnudcfmgkmsdqqv.supabase.co:5432/postgres
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;