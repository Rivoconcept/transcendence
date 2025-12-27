import { AppDataSource } from "./data-source";
import express from "express";

const app = express();
const PORT = 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Backend prêt (TypeORM + PostgreSQL)");

    // test route API
    app.get("/api", (req, res) => res.json({ status: "Backend OK" }));

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("❌ Erreur TypeORM", error));
