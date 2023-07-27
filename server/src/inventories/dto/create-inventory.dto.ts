import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateInventoryDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    @IsNumber()
    cost: number;
    @IsNotEmpty()
    @IsNumber()
    qty: number;
    @IsNumber()
    min_qty: number;
    @IsNotEmpty()
    @IsNumber()
    product_id: number;
    @IsNumber()
    warehouse_id: number;
    
}
