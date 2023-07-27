import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, ParseIntPipe } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from '@prisma/client';

@Controller('inventories')
export class InventoriesController {
  
  constructor(
    private readonly inventoriesService: InventoriesService
    ) {}

  @Post()
  async create(@Body() createInventoryDto: CreateInventoryDto): Promise<Inventory|HttpException> {
    return this.inventoriesService.create(createInventoryDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Inventory|HttpException> {
    return this.inventoriesService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Inventory[]> {
    return this.inventoriesService.findAll();
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateInventoryDto: UpdateInventoryDto): Promise<Inventory|HttpException> {
    return this.inventoriesService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Inventory|HttpException> {
    return this.inventoriesService.remove(id);
  }
}
