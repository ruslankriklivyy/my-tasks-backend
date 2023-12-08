import { IsString } from 'class-validator';

export class SignInGoogleDto {
  @IsString()
  access_token: string;
}
