import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the DATABASE_URL from Render
  ssl: {
    rejectUnauthorized: false, // Required for Render PostgreSQL
  },
});

export default pool;
