import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/services/prisma.service';
import { Supplier } from '@prisma/client';

@Injectable()
export class SuppliersService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier|HttpException> {
    try {
      return await this.prisma.supplier.create({
        data: createSupplierDto
      });
    } catch (err) {
      throw new HttpException('There was a problem while persisting object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(): Promise<Supplier[]> {
    return await this.prisma.supplier.findMany();
  }

  async findOne(id: number): Promise<Supplier|HttpException> {
    try {
      return await this.prisma.supplier.findUnique({ where: { id } });
    } catch (err) {
      console.error(err)
      throw new HttpException('There was a problem while retreving object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<Supplier|HttpException> {
    try {
      return await this.prisma.supplier.update(
        { data: updateSupplierDto, where: { id } }
      );
    } catch (err) {
      throw new HttpException('There was a problem while updating object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number): Promise<Supplier|HttpException> {

    try {
      const deletedObject = await this.prisma.supplier.findFirst({ where: { id } });
      await this.prisma.supplier.delete({ where: { id } });
      return deletedObject;
    } catch (err) {
      throw new HttpException('There was a problem while removing object', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
}
