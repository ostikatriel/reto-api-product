
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductService {

  private products = new Map<string, Product>();
  private id_increment = 1;

  create(dto: CreateProductDto) {

    const product: Product = {
      id: this.id_increment++,
      sku: dto.sku,
      name: dto.name,
      category: dto.category,
      stock: dto.stock,
      status: this.calculateStatus(dto.stock),
    }

    this.products.set(product.sku, product);
    return product
  }

  private calculateStatus(stock: number): string {
    if (stock === 0) return 'OUT_OF_STOCK'
    if (stock <= 5) return 'LOW_STOCK'
    return 'ACTIVE'
  }

  findAll(category: string, status: string) {
    let products = Array.from(this.products.values())
    if (category) {
      products = products.filter(product => product.category === category)
    }

    if (status) {
      products = products.filter(product => product.status === status)
    }
    return products
  }

  changeStock(sku: string, quantity: number) {
    const product = this.products.get(sku);
    if (!product) throw new NotFoundException('Producto no encontrado');
    const newStock = product.stock + quantity;
    if (newStock < 0) throw new ConflictException('Stock no puede ser negativo');
    product.stock = newStock;
    product.status = this.calculateStatus(product.stock);
    this.products.set(sku, product);
    return product;
  }

  delete(sku: string) {
    const product = this.products.has(sku);
    if (!product) throw new NotFoundException('Producto no encontrado');
    this.products.delete(sku);
    return product;
  }
}
