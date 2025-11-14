import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from "@nestjs/config";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService, @InjectRepository(User) private userRepository: Repository<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('JWT_SECRET') || '',
            ignoreExpiration: false,
        })
    }
    async validate(payload: { sub: string }): Promise<Omit<User, 'password_hash'>> {
        const user = await this.userRepository.findOneBy({ id: payload.sub })
        if (!user) {
            throw new UnauthorizedException();
        }
        const { password_hash, ...result } = user;
        return result
    }
}