import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Create table if not exists
const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(15) NOT NULL
      );
    `);
    console.log("Users table is ready");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};
createTable();

// Route to handle form submission
app.post("/submit", async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    await pool.query("INSERT INTO users (name, email, phone) VALUES ($1, $2, $3)", [name, email, phone]);
    res.json({ message: "User data saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err.message });
  }
});

// Route to get all users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
