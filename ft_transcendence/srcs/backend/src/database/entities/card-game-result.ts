import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, type Relation } from "typeorm";
import { User } from "./user.js";

@Entity("card_game_results")
export class CardGameResult {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("uuid")
  user_id!: string;

  @ManyToOne(() => User, (user) => user.id)
  user!: Relation<User>;

  @Column("integer")
  score!: number;

  @Column("boolean")
  is_win!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}
