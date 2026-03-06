
import { Module } from '@nestjs/common';
import { ProductContoller } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductContoller],
  providers: [ProductService],
})
export class ProductModule {}
