import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
            global: true,
                secret: config.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '60s' }
            })
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersModule, JwtStrategy],
    exports: [JwtModule]
})
export class AuthModule { }
