import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "transcendence",
  password: "superpassword",
  database: "transcendence",
  synchronize: true,
  logging: true,
  entities: ["src/entity/**/*.ts"]
});
