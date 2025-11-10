import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { fileURLToPath } from "url";
import { dirname, join } from "path";



config();

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'secret',
    database: process.env.DB_NAME || 'golibrary',
    entities: [join(process.cwd(), 'src/**/*.entity{.ts,.js}')],
    migrations: [join(process.cwd(), 'src/migrations/*{.ts,.js}')],
    synchronize: false, // ❌ nunca use sync com migrations
});