import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('suppliers')
export class SuppliersController {
  
  constructor(
    private readonly suppliersService: SuppliersService
    ) {}

  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto): Promise<Supplier|HttpException> {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Supplier|HttpException> {
    return this.suppliersService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Supplier[]> {
    return this.suppliersService.findAll();
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSupplierDto: UpdateSupplierDto): Promise<Supplier|HttpException> {
    return this.suppliersService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Supplier|HttpException> {
    return this.suppliersService.remove(id);
  }
}
