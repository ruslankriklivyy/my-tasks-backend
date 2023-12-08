import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { TokenService } from '../token/token.service';
import { UserService } from '@/modules/user/user.service';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { RoleService } from '@/modules/role/role.service';
import { RegistrationDto } from '@/modules/auth/dto/registration.dto';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { SignInGoogleDto } from '@/modules/auth/dto/sign-in-google.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private readonly tokenService: TokenService,
    private readonly roleService: RoleService,
  ) {}

  async registration(registrationDto: RegistrationDto) {
    const { full_name, email, password, avatar_id } = registrationDto;
    const user = await this.userService.findOne({ email });

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'There is already a user with this email',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userRole = await this.roleService.findOne({ slug: 'user' });
    const hashPassword = await bcrypt.hash(password, 3);

    const newUser = await this.userService.create({
      full_name,
      email,
      avatar_id,
      role_id: userRole.id,
      password: hashPassword,
    });

    const tokens = await this.tokenService.generateTokens(newUser);

    await this.tokenService.saveToken(newUser.id, tokens.refresh_token);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: newUserPassword, ...userInfo } = newUser;

    return { ...tokens, user: userInfo };
  }

  async login(userDto: LoginDto) {
    const { email, password } = userDto;
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);

    if (!isPasswordEquals) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid password or email',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const tokens = await this.tokenService.generateTokens({ ...user });

    await this.tokenService.saveToken(user.id, tokens.refresh_token);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: newUserPassword, ...userInfo } = user;

    return { ...tokens, user: userInfo };
  }

  async signInFromGoogle(signInGoogleDto: SignInGoogleDto) {
    const { access_token } = signInGoogleDto;
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${access_token}`,
      ),
    );

    const userRole = await this.roleService.findOne({ slug: 'user' });
    const userFromBD = await this.userService.findOne({ email: data.email });

    const newUser: CreateUserDto = {
      full_name: data.name,
      email: data.email,
      role_id: userRole.id,
      password: '',
    };

    if (!userFromBD) {
      const user = await this.userService.create(newUser);
      const tokens = await this.tokenService.generateTokensFromGoogle(newUser);

      await this.tokenService.saveToken(user.id, tokens.refresh_token);

      return { ...tokens, user };
    }

    const tokens = await this.tokenService.generateTokensFromGoogle(newUser);

    await this.tokenService.saveToken(userFromBD.id, tokens.refresh_token);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const decodedData =
      await this.tokenService.validateRefreshToken(refreshToken);
    const user = await this.userService.findOne({ email: decodedData.email });
    const token = await this.tokenService.findRefreshToken(refreshToken);

    if (!decodedData || !token) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const tokens = await this.tokenService.generateTokens({ ...user });

    await this.tokenService.saveToken(user.id, tokens.refresh_token);

    return { ...tokens, user };
  }

  logout(userId: number) {
    return this.tokenService.removeToken(userId);
  }
}
