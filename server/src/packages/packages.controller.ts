import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, ParseIntPipe } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from '@prisma/client';

@Controller('packages')
export class PackagesController {
  
  constructor(
    private readonly packagesService: PackagesService
    ) {}

  @Post()
  async create(@Body() createPackageDto: CreatePackageDto): Promise<Package|HttpException> {
    return this.packagesService.create(createPackageDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Package|HttpException> {
    return this.packagesService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Package[]> {
    return this.packagesService.findAll();
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePackageDto: UpdatePackageDto): Promise<Package|HttpException> {
    return this.packagesService.update(id, updatePackageDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Package|HttpException> {
    return this.packagesService.remove(id);
  }
}
