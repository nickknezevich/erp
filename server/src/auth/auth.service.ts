import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/services/prisma.service';
import { RegistrationStatus } from './registration-status';
export const roundsOfHashing = 10;
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) { }

  async register(data: CreateUserDto): Promise<RegistrationStatus | HttpException> {
    try {

      const hashedPassword = await bcrypt.hash(
        data.password,
        roundsOfHashing,
      );
  
      data.password = hashedPassword;

      const userInDb = await this.usersService.findOneByUsername(data.email);

      if (userInDb) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      const { email, password, first_name, last_name, roles } = data;
      await this.prisma.user.create({
        data: {
          ...data,
          token: ''
        }
      });
      return {
        success: true,
        message: "New user Created!"
      }
    } catch (err) {
      console.error(err);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findByLogin(loginUserDto);
    return {
      email: user.email,
      roles: user.roles,
      access_token: this.jwtService.sign(loginUserDto),
      ...user
    };
  }

  async getProfile(username: string): Promise<User>{
    return await this.usersService.findOneByUsername(username);
  }
  

}