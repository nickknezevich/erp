import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateSupplierDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    address: string;
    @IsOptional()
    zip: number;
    @IsOptional()
    city: string;
}
