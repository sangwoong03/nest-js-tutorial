import { registerAs } from "@nestjs/config";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { User } from "src/modules/auth/entity/user.entity";

export const entities = [
  User
]

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  charset: string;
}

export default registerAs('app', () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: entities,
      namingStrategy: new SnakeNamingStrategy(),
      charset: 'utf8mb4',
    },
  })
);