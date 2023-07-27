import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { Role } from '../../rbac/role.enum';

export class CreateUserDto {
  
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsEmail()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  full_name: string;

  roles?: Role[];

  uuid?: string;

  picture?: string;
}