/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository, getRepository, MoreThan } from 'typeorm';

import { ProductResponseDto } from './product-response.dto';
import { User } from 'src/user/user.entity';
import { SearchParams } from './interfaces';
import { QUERY_ADD_WHERE } from './constants';
import { SUCCESFUL_MESSAGES, RESPONSE_STATUS } from 'src/shared/constants';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>, //private pictureRepository: Repository<Picture>,
  ) {}

  async getAllProducts(user: User): Promise<ProductResponseDto[]> {
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
      .orderBy('distance', 'ASC')
      .getRawAndEntities();

    return this.mergeRawAndEntities(products);
  }

  async getProductsFiltered(user: User, searchParams: SearchParams) {
    const queryBuilder = getRepository(Product).createQueryBuilder('product');

    const partialQuery = queryBuilder
      .where('product.userId NOT IN (:...id)', { id: [user.id] })
      .leftJoinAndSelect('product.pictures', 'picture')
      .leftJoinAndSelect('product.user', 'user')
      .addSelect(
        `ROUND(ST_Distance_Sphere(point(${user.lat}, ${user.lng}),coords)/1000)`,
        'distance',
      )
      .addSelect('ST_X(coords)', 'lat')
      .addSelect('ST_Y(coords)', 'lng')
      .orderBy('distance', 'ASC');

    for (const [key] of Object.entries(searchParams)) {
      QUERY_ADD_WHERE[key]({ partialQuery, searchParams, user });
    }

    const completeQuery = await partialQuery.getRawAndEntities();

    return this.mergeRawAndEntities(completeQuery);
  }

  mergeRawAndEntities(products) {
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
