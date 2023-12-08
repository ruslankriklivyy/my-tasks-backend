import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsString()
  full_name: string;

  @IsNumber()
  role_id: number;

  @IsOptional()
  @IsNumber()
  avatar_id?: number | null;
}
