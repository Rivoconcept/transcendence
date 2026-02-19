import { AppDataSource } from "../database/data-source.js";
import { CardGameResult } from "../database/entities/card-game-result.js";

interface CreateCardGameResultDTO {
  user_id: string;
  score: number;
  is_win: boolean;
}

class CardGameService {
  private cardGameResultRepository = AppDataSource.getRepository(CardGameResult);

  async createCardGameResult(data: CreateCardGameResultDTO): Promise<CardGameResult> {
    if (!data.user_id || typeof data.score !== "number" || typeof data.is_win !== "boolean") {
      throw new Error("Invalid card game result data");
    }

    const cardGameResult = this.cardGameResultRepository.create({
      user_id: data.user_id,
      score: data.score,
      is_win: data.is_win,
    });

    return await this.cardGameResultRepository.save(cardGameResult);
  }

  async getUserCardGameResults(user_id: string): Promise<CardGameResult[]> {
    return await this.cardGameResultRepository.find({
      where: { user_id },
      order: { created_at: "DESC" },
    });
  }

  async getUserCardGameStats(user_id: string) {
    const results = await this.getUserCardGameResults(user_id);
    
    if (results.length === 0) {
      return {
        total_games: 0,
        wins: 0,
        losses: 0,
        average_score: 0,
        highest_score: 0,
      };
    }

    const wins = results.filter(r => r.is_win).length;
    const losses = results.length - wins;
    const totalScore = results.reduce((sum, r) => sum + r.score, 0);
    const averageScore = totalScore / results.length;
    const highestScore = Math.max(...results.map(r => r.score));

    return {
      total_games: results.length,
      wins,
      losses,
      average_score: averageScore,
      highest_score: highestScore,
    };
  }
}

export const cardGameService = new CardGameService();
