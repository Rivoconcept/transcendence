import { Response } from "express";
import { cardGameService } from "../services/card-game.service.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

export async function createCardGameResult(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { user_id, score, is_win } = req.body;

    if (!user_id || typeof score !== "number" || typeof is_win !== "boolean") {
      res.status(400).json({ error: "Missing or invalid required fields: user_id, score, is_win" });
      return;
    }

    const result = await cardGameService.createCardGameResult({
      user_id,
      score,
      is_win,
    });

    res.status(201).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create card game result";
    res.status(400).json({ error: message });
  }
}

export async function getUserCardGameResults(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const results = await cardGameService.getUserCardGameResults(userId);
    res.json(results);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch card game results";
    res.status(500).json({ error: message });
  }
}

export async function getUserCardGameStats(req: AuthRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const stats = await cardGameService.getUserCardGameStats(userId);
    res.json(stats);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch card game stats";
    res.status(500).json({ error: message });
  }
}
