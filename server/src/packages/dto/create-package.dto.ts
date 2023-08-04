import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePackageDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
}
