import { Module } from '@nestjs/common';
import { SupliersService } from './suppliers.service';
import { SupliersController } from './suppliers.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [SupliersController],
  providers: [SupliersService, PrismaService]
})
export class SupliersModule {}
