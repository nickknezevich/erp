import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './Inventories.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [InventoriesController],
  providers: [InventoriesService, PrismaService]
})
export class InventoriesModule {}
