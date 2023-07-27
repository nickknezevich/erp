import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { PrismaService } from 'src/services/prisma.service';
import { Warehouse } from '@prisma/client';

@Injectable()
export class WarehousesService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse|HttpException> {
    try {
      return await this.prisma.warehouse.create({
        data: createWarehouseDto
      });
    } catch (err) {
      throw new HttpException('There was a problem while persisting object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(): Promise<Warehouse[]> {
    return await this.prisma.warehouse.findMany();
  }

  async findOne(id: number): Promise<Warehouse|HttpException> {
    try {
      return await this.prisma.warehouse.findUnique({ where: { id } });
    } catch (err) {
      console.error(err)
      throw new HttpException('There was a problem while retreving object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateWarehouseDto: UpdateWarehouseDto): Promise<Warehouse|HttpException> {
    try {
      return await this.prisma.warehouse.update(
        { data: updateWarehouseDto, where: { id } }
      );
    } catch (err) {
      throw new HttpException('There was a problem while updating object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number): Promise<Warehouse|HttpException> {

    try {
      const deletedObject = await this.prisma.warehouse.findFirst({ where: { id } });
      await this.prisma.warehouse.delete({ where: { id } });
      return deletedObject;
    } catch (err) {
      throw new HttpException('There was a problem while removing object', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
}
