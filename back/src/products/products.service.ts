/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository, createQueryBuilder, getRepository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { ProductResponseDto } from './product-response.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>, //private pictureRepository: Repository<Picture>,
  ) {}

  async getAllProducts(user): Promise<ProductResponseDto[]> {
    const products = await getRepository(Product)
      .createQueryBuilder('product')
      .where('product.userId NOT IN (:...id)', { id: [user.id] })
      .leftJoinAndSelect('product.pictures', 'picture')
      .leftJoinAndSelect('product.user', 'user')
      .addSelect(
        `ROUND(ST_Distance_Sphere(point(${user.lat}, ${user.lng}),coords)/1000)`,
        'distance',
      )
      .addSelect('ST_X(coords)', 'lat')
      .addSelect('ST_Y(coords)', 'lng')
      .getRawAndEntities();

    return products.entities.map((entity, index) => {
      console.log(products.raw[index]);
      return {
        ...entity,
        distance_to_user: products.raw[index].distance,
        lat: products.raw[index].lat,
        lng: products.raw[index].lng,
      };
    });
  }

  saveProduct(product: Product) {
    return this.productRepository.insert(product);
  }
}
