import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegistrationDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  full_name: string;

  @IsNumber()
  @IsOptional()
  avatar_id: number;
}
