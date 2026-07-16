const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',       // troca pelo seu usuário do pgAdmin
  host: 'localhost',
  database: 'escola_db',
  password: 'postgres',  // troca pela sua senha
  port: 5432,
});

module.exports = pool;