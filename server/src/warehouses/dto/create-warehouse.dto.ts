import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateWarehouseDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    zip: number;
    @IsNotEmpty()
    city: string;
}
