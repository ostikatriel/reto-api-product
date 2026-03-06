import { IsInt, Min } from "class-validator";

export class UpdateStockDto {
    @IsInt()
    quantity: number;
}