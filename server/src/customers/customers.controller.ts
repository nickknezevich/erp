import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/services/prisma.service';
import { Customer } from '@prisma/client';
import { Http2SecureServer, Http2Server } from 'http2';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('customers')
export class CustomersController {
  
  constructor(
    private readonly customersService: CustomersService
    ) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer|HttpException> {
    return this.customersService.create(createCustomerDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Customer|HttpException> {
    return this.customersService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCustomerDto: UpdateCustomerDto): Promise<Customer|HttpException> {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Customer|HttpException> {
    return this.customersService.remove(+id);
  }
}
