import { Module } from '@nestjs/common';
import { SupliersService } from './supliers.service';
import { SupliersController } from './supliers.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [SupliersController],
  providers: [SupliersService, PrismaService]
})
export class SupliersModule {}
