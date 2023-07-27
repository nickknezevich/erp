import { PartialType } from '@nestjs/mapped-types';
import { CreateWarehouseDto } from './create-warehouse.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {
    @IsNotEmpty()
    name: string;
    @IsOptional()
    address: string;
    @IsOptional()
    zip: number;
    @IsOptional()
    city: string;
}
