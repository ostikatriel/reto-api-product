import { IsInt, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    
    @IsString()
    sku: string;

    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    category: string;

    @IsInt()
    @Min(0)
    stock: number;
}