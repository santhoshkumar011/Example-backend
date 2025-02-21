import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL Connection Setup
const { Pool } = pg;
const pool = new Pool({
  connectionString: "postgresql://postgres_wbe9_user:qs5MrhsNQVjsvsF1VS4g0mXVWpMonX7V@dpg-curkk2tds78s73ekigjg-a/postgres_wbe9", // Use Render's database
  ssl: {
    rejectUnauthorized: false, // Required for Render’s managed PostgreSQL
  },
});

app.use(cors());
app.use(express.json());

// API Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.post("/submit", async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING *",
      [name, email, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
