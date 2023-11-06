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
  entities: [];
  charset: string;
}

export interface JwtConfig {
  accessTokenSecret: string;
  accessTokenExpiration: string;
  refreshTokenSecret: string;
  refreshTokenExpiration: string;
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
    jwt: {
      accessTokenSecret: process.env.ACCESS_TOKEN_SECRET_KEY,
      accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET_KEY,
      refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    }
  })
);