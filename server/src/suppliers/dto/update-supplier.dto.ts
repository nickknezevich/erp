import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
    @IsNotEmpty()
    name: string;
    @IsOptional()
    address: string;
    @IsOptional()
    zip: number;
    @IsOptional()
    city: string;
}
