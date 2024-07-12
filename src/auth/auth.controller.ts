import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpdto } from './dto/signup,dto';
import { Logindto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authservice: AuthService
    ) { }

    @Post('/signup')
    signUp(@Body() signUpdto: signUpdto): Promise<{ token: string }> {
        return this.authservice.signUp(signUpdto);
    }

    @Get('/login')
    login(@Body() logindto: Logindto): Promise<{ token: string }> {
        return this.authservice.login(logindto);
    }
}
