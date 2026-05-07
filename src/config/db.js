
import mysql from "mysql2/promise"; 

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || "localhost",
  port:     process.env.DB_PORT     || 3307,
  database: process.env.DB_NAME     || "mvc_demo",
  user:     process.env.DB_USER     || "root",
  password: process.env.DB_PASSWORD || "password",
  waitForConnections: true,
  connectionLimit:    10,
});

export default pool;