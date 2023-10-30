import { registerAs } from "@nestjs/config";

// import { entities } from "src/modules";

export interface DatabaseConfig {
  type: string,
  host: string;
  port: number;
  username: string;
  password: string;
  dbname: string;
  synchronize: boolean;
  charset: string,
}

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: process.env.STAGE !== 'production',
    // entities: entities,
    charset: 'utf8mb4',
  },
}));