import dotenv from "dotenv";
import app from "./app";
import pool from "./config/database";

dotenv.config();

const PORT = Number(process.env.PORT || 5000);

async function startServer(): Promise<void> {
  try {
    const connection = await pool.getConnection();

    await connection.ping();
    connection.release();

    console.log("✅ MySQL database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚗 LIFT API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MySQL connection failed:", error);
    process.exit(1);
  }
}

startServer();