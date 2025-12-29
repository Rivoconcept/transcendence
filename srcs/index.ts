import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "./config/data-source";

const app = express();
const PORT = 5000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");

    app.get("/api", (req: Request, res: Response) => {
      res.json({ status: "Backend OK" });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Backend listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database error", error);
  });