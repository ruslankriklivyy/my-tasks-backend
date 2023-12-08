import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { RegistrationDto } from '@/modules/auth/dto/registration.dto';
import { SignInGoogleDto } from '@/modules/auth/dto/sign-in-google.dto';
import { CurrentUser } from '@/modules/user/decorators/current-user.decorator';
import { ICurrentUser } from '@/modules/user/interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('registration')
  registration(@Body() registrationDto: RegistrationDto) {
    return this.authService.registration(registrationDto);
  }

  @Post('sign-in-google')
  signInGoogle(@Body() signInGoogleDto: SignInGoogleDto) {
    return this.authService.signInFromGoogle(signInGoogleDto);
  }

  @Post('logout')
  logout(@CurrentUser() user: ICurrentUser) {
    return this.authService.logout(user.id);
  }
}
