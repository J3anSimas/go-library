import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login-request.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async authenticate(loginRequestDto: LoginRequestDto): Promise<{ access_token: string }> {
        const user = await this.usersRepository.findOneBy({ email: loginRequestDto.email });
        if (!user) {
            throw new UnauthorizedException();
        }
        const isPasswordValid = await bcrypt.compare(loginRequestDto.password, user.password_hash);
        if (!isPasswordValid) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id };
        return {
            // access_token: 'teste'
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
