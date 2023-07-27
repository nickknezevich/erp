import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'src/services/prisma.service';
import { User, Prisma } from '@prisma/client';
import { comparePasswords } from 'helpers/utils';


@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  
  async findOneByUsername(username: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { email: username },
    });
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<User> {

    const user = await this.prisma.user.findUnique({
      where: { email: username },
    });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}