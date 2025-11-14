import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GuardsModule } from './common/modules/guards.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // não precisa importar em cada módulo
            ignoreEnvFile: process.env.NODE_ENV !== 'development',
            envFilePath: process.env.NODE_ENV === 'development' ? '.env' : undefined,
        }),

        // 2️⃣ Configuração assíncrona do TypeORM
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule], // precisa importar o módulo de onde virá o ConfigService
            inject: [ConfigService], // injeta o ConfigService no factory
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST', 'localhost'),
                port: configService.get<number>('DB_PORT', 5432),
                username: configService.get<string>('DB_USER', 'postgres'),
                password: configService.get<string>('DB_PASS', 'secret'),
                database: configService.get<string>('DB_NAME', 'golibrary'),
                autoLoadEntities: true, // carrega automaticamente todas as entidades registradas
                migrations: [`${__dirname}/migrations/{.ts,*.js}`],
                migrationsRun: true
            }),
        }),
        AuthModule, UsersModule, GuardsModule],
    controllers: [AppController],
    providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule { }
