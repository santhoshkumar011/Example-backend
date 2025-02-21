import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render DB URL from .env
  ssl: { rejectUnauthorized: false },
});

async function createTable() {
  try {
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL
      );
    `);
    console.log("✅ Table created (if not exists)");
    client.release();
  } catch (err) {
    console.error("❌ Error creating table:", err);
  }
}

createTable();

export default pool;
