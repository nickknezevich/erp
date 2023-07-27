import {
    ClassSerializerInterceptor,
    Controller,
    DefaultValuePipe,
    Get,
    ParseIntPipe,
    Query,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { AuthGuard } from './../auth/auth.guard';


@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    @UseGuards(AuthGuard)
    async index(
        @Query('skip', new DefaultValuePipe(1), ParseIntPipe) skip = 1,
        @Query('take', new DefaultValuePipe(10), ParseIntPipe) take = 10,
    ): Promise<User[]> {
        return this.usersService.users({ skip, take });
    }

}
