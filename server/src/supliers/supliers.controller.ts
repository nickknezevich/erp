import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, ParseIntPipe } from '@nestjs/common';
import { SupliersService } from './supliers.service';
import { CreateSuplierDto } from './dto/create-suplier.dto';
import { UpdateSuplierDto } from './dto/update-suplier.dto';
import { Suplier } from '@prisma/client';

@Controller('supliers')
export class SupliersController {
  
  constructor(
    private readonly supliersService: SupliersService
    ) {}

  @Post()
  async create(@Body() createSuplierDto: CreateSuplierDto): Promise<Suplier|HttpException> {
    return this.supliersService.create(createSuplierDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Suplier|HttpException> {
    return this.supliersService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Suplier[]> {
    return this.supliersService.findAll();
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSuplierDto: UpdateSuplierDto): Promise<Suplier|HttpException> {
    return this.supliersService.update(id, updateSuplierDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Suplier|HttpException> {
    return this.supliersService.remove(id);
  }
}
