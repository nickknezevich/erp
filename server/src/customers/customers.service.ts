import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/services/prisma.service';
import { Customer } from '@prisma/client';

@Injectable()
export class CustomersService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer|HttpException> {
    try {
      return await this.prisma.customer.create({
        data: createCustomerDto
      });
    } catch (err) {
      console.error(err);
      throw new HttpException('There was a problem while persisting object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(): Promise<Customer[]> {
    return await this.prisma.customer.findMany();
  }

  async findOne(id: number): Promise<Customer|HttpException> {
    try {
      return await this.prisma.customer.findUnique({ where: { id } });
    } catch (err) {
      console.error(err)
      throw new HttpException('There was a problem while retreving object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer|HttpException> {
    try {
      return await this.prisma.customer.update(
        { data: updateCustomerDto, where: { id } }
      );
    } catch (err) {
      throw new HttpException('There was a problem while updating object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number): Promise<Customer|HttpException> {

    try {
      const deletedObject = await this.prisma.customer.findFirst({ where: { id: Number(id) } });
      await this.prisma.customer.delete({ where: { id } });
      return deletedObject;
    } catch (err) {
      throw new HttpException('There was a problem while removing object', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
}
