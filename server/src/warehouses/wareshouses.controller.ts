import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, ParseIntPipe } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from '@prisma/client';

@Controller('warehouses')
export class WarehousesController {
  
  constructor(
    private readonly warehousesService: WarehousesService
    ) {}

  @Post()
  async create(@Body() createWarehouseDto: CreateWarehouseDto): Promise<Warehouse|HttpException> {
    return this.warehousesService.create(createWarehouseDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Warehouse|HttpException> {
    return this.warehousesService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Warehouse[]> {
    return this.warehousesService.findAll();
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateWarehouseDto: UpdateWarehouseDto): Promise<Warehouse|HttpException> {
    return this.warehousesService.update(id, updateWarehouseDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Warehouse|HttpException> {
    return this.warehousesService.remove(id);
  }
}
