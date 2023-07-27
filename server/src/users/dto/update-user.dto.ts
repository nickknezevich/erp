import { IsNotEmpty, IsEmail } from 'class-validator';
import { Role } from '../../rbac/role.enum';

export class UpdateUserDto {
  
  username: string;

  first_name: string;

  last_name: string;

  password: string;

  @IsEmail()
  email: string;

  roles?: Role[];

  uuid?: string;

  picture?: string;
  
}