import { PartialType } from '@nestjs/mapped-types';
import { CreateSuplierDto } from './create-suplier.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSuplierDto extends PartialType(CreateSuplierDto) {
    @IsNotEmpty()
    name: string;
    @IsOptional()
    address: string;
    @IsOptional()
    zip: number;
    @IsOptional()
    city: string;
}
