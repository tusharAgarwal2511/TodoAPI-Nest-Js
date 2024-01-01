import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { UserLoginDto } from 'src/DTO/userLogin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

        constructor(private authService: AuthService) { }

        @Post('register')
        registeration(@Body(ValidationPipe) regDto: RegisterUserDto) {
                return this.authService.registerUser(regDto)
        }

        @Post('login')
        signin(@Body(ValidationPipe) loginDTO: UserLoginDto) {
                return this.authService.loginUser(loginDTO);
        }


}
