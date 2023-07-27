import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { PrismaService } from 'src/services/prisma.service';
import { Inventory } from '@prisma/client';

@Injectable()
export class InventoriesService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory|HttpException> {
    try {
      return await this.prisma.inventory.create({
        data: createInventoryDto
      });
    } catch (err) {
      console.error(err)
      throw new HttpException('There was a problem while persisting object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(): Promise<Inventory[]> {
    return await this.prisma.inventory.findMany();
  }

  async findOne(id: number): Promise<Inventory|HttpException> {
    try {
      return await this.prisma.inventory.findUnique({ where: { id } });
    } catch (err) {
      console.error(err)
      throw new HttpException('There was a problem while retreving object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<Inventory|HttpException> {
    try {
      return await this.prisma.inventory.update(
        { data: updateInventoryDto, where: { id } }
      );
    } catch (err) {
      throw new HttpException('There was a problem while updating object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number): Promise<Inventory|HttpException> {

    try {
      const deletedObject = await this.prisma.inventory.findFirst({ where: { id } });
      await this.prisma.inventory.delete({ where: { id } });
      return deletedObject;
    } catch (err) {
      throw new HttpException('There was a problem while removing object', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
}
