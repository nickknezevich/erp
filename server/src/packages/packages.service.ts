import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PrismaService } from 'src/services/prisma.service';
import { Package } from '@prisma/client';

@Injectable()
export class PackagesService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createPackageDto: CreatePackageDto): Promise<Package|HttpException> {
    try {
      return await this.prisma.package.create({
        data: createPackageDto
      });
    } catch (err) {
      throw new HttpException('There was a problem while persisting object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(): Promise<Package[]> {
    return await this.prisma.package.findMany();
  }

  async findOne(id: number): Promise<Package|HttpException> {
    try {
      return await this.prisma.package.findUnique({ where: { id } });
    } catch (err) {
      console.error(err)
      throw new HttpException('There was a problem while retreving object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updatePackageDto: UpdatePackageDto): Promise<Package|HttpException> {
    try {
      return await this.prisma.package.update(
        { data: updatePackageDto, where: { id } }
      );
    } catch (err) {
      throw new HttpException('There was a problem while updating object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number): Promise<Package|HttpException> {

    try {
      const deletedObject = await this.prisma.package.findFirst({ where: { id } });
      await this.prisma.package.delete({ where: { id } });
      return deletedObject;
    } catch (err) {
      throw new HttpException('There was a problem while removing object', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
}
