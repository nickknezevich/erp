import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSuplierDto } from './dto/create-suplier.dto';
import { UpdateSuplierDto } from './dto/update-suplier.dto';
import { PrismaService } from 'src/services/prisma.service';
import { Suplier } from '@prisma/client';

@Injectable()
export class SupliersService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createSuplierDto: CreateSuplierDto): Promise<Suplier|HttpException> {
    try {
      return await this.prisma.suplier.create({
        data: createSuplierDto
      });
    } catch (err) {
      throw new HttpException('There was a problem while persisting object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(): Promise<Suplier[]> {
    return await this.prisma.suplier.findMany();
  }

  async findOne(id: number): Promise<Suplier|HttpException> {
    try {
      return await this.prisma.suplier.findUnique({ where: { id } });
    } catch (err) {
      console.error(err)
      throw new HttpException('There was a problem while retreving object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateSuplierDto: UpdateSuplierDto): Promise<Suplier|HttpException> {
    try {
      return await this.prisma.suplier.update(
        { data: updateSuplierDto, where: { id } }
      );
    } catch (err) {
      throw new HttpException('There was a problem while updating object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number): Promise<Suplier|HttpException> {

    try {
      const deletedObject = await this.prisma.suplier.findFirst({ where: { id } });
      await this.prisma.suplier.delete({ where: { id } });
      return deletedObject;
    } catch (err) {
      throw new HttpException('There was a problem while removing object', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
}
