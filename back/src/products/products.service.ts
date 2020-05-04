/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository, getRepository } from 'typeorm';

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

    return products.entities.map(entity => {
      const firsMatchingProduct = products.raw.find(
        ({ product_id }) => product_id == entity.id,
      );

      return {
        ...entity,
        distance_to_user: firsMatchingProduct.distance,
        lat: firsMatchingProduct.lat,
        lng: firsMatchingProduct.lng,
      };
    });
  }

  saveProduct(product: Product) {
    return this.productRepository.insert(product);
  }
}
