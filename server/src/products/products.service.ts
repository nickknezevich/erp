import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/services/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {

  constructor(
    private prisma: PrismaService
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product|HttpException> {
    try {
      return await this.prisma.product.create({
        data: createProductDto
      });
    } catch (err) {
      throw new HttpException('There was a problem while persisting object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product|HttpException> {
    try {
      return await this.prisma.product.findUnique({ where: { id } });
    } catch (err) {
      console.error(err)
      throw new HttpException('There was a problem while retreving object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product|HttpException> {
    try {
      return await this.prisma.product.update(
        { data: updateProductDto, where: { id } }
      );
    } catch (err) {
      throw new HttpException('There was a problem while updating object', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number): Promise<Product|HttpException> {

    try {
      const deletedObject = await this.prisma.product.findFirst({ where: { id } });
      await this.prisma.product.delete({ where: { id } });
      return deletedObject;
    } catch (err) {
      throw new HttpException('There was a problem while removing object', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
}
