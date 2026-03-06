import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateStockDto } from "./dtos/update-stock.dto";

@Controller('products')
export class ProductContoller {

  constructor(private readonly service: ProductService) {

  }


  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('category') category: string, @Query('status') status: string) {
    return this.service.findAll(category, status);
  }

  @Patch(':sku/stock')
  changeStock(@Param('sku') sku: string, @Body() dto: UpdateStockDto) {
    return this.service.changeStock(sku, dto.quantity);
  }

  @Delete(':sku')
  delete(@Param('sku') sku: string) {
    return this.service.delete(sku);
  }

}
