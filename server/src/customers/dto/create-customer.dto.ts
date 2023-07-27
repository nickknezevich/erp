import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCustomerDto {
    @IsNotEmpty()
    name: string;
    @IsOptional()
    first_name: string;
    @IsOptional()
    last_name: string;
    @IsOptional()
    address: string;
    @IsOptional()
    zip: number;
    @IsOptional()
    city: string;
}
