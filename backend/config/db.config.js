//  Import the mysql2 module
const mysql = require("mysql2/promise");

let conn = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
};

// Create the connection pool
const pool = mysql.createPool(conn);

// Create an async function to execute sql queries
async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  console.log(`Connection created to ${process.env.database}`);
  return rows;
}

//  export the connection
module.exports = {query};