import { Router } from "express";
import { createCardGameResult, getUserCardGameResults, getUserCardGameStats } from "../controllers/card-game.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Route pour créer un résultat de jeu
router.post("/card-game-results", createCardGameResult);

// Routes protégées (nécessitent authentification)
router.get("/card-game-results", authMiddleware, getUserCardGameResults);
router.get("/card-game-stats", authMiddleware, getUserCardGameStats);

export default router;
