import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthService) private authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() loginRequestDto: LoginRequestDto) {
        return this.authService.authenticate(loginRequestDto);
    }
}
