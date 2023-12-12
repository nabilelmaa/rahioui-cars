const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "nabil200101@",
  database: "rahioui-cars",
});

module.exports = pool;
