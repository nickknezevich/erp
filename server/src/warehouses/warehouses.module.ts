import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './wareshouses.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [WarehousesController],
  providers: [WarehousesService, PrismaService]
})
export class WarehousesModule {}
