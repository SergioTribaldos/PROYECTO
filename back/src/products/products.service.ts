/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository, getRepository } from 'typeorm';

import { ProductResponseDto } from './product-response.dto';
import { User } from 'src/user/user.entity';
import { SearchParams } from './interfaces';
import { QUERY_ADD_WHERE } from './constants';
import {
  SUCCESFUL_MESSAGES,
  RESPONSE_STATUS,
  ERROR_MESSAGES,
} from 'src/shared/constants';
import { Picture } from 'src/pictures/pictures.entity';
import { Conversation } from 'src/messages/conversation.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Picture)
    private pictureRepository: Repository<Picture>,
  ) {}

  async getAllProducts(
    user: User,
    skippedResults?: number,
  ): Promise<ProductResponseDto[]> {
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
      .skip(skippedResults)
      .take(10)
      .getRawAndEntities();

    return this.mergeRawAndEntities(products);
  }

  async getUserProducts(user: User): Promise<ProductResponseDto[]> {
    const products = await getRepository(Product)
      .createQueryBuilder('product')
      .where('product.userId IN (:...id)', { id: [user.id] })
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

  private mergeRawAndEntities(products) {
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

  addViewedProduct(productId: number) {
    return this.productRepository.update(
      { id: productId },
      { viewed_times: () => 'viewed_times + 1' },
    );
  }

  async deleteProduct(productId: number) {
    await getRepository(Picture)
      .createQueryBuilder('picture')
      .delete()
      .where('productId = :productId', { productId: productId })
      .execute();

    await getRepository(Conversation)
      .createQueryBuilder('conversation')
      .delete()
      .where('productId = :productId', { productId: productId })
      .execute();

    const { raw } = await this.productRepository.delete({ id: productId });

    const message =
      raw.affectedRows != 0
        ? {
            msg: SUCCESFUL_MESSAGES.DELETE_PRODUCT,
            status: RESPONSE_STATUS.OK,
          }
        : {
            msg: ERROR_MESSAGES.DELETE_PRODUCT_FAIL,
            status: RESPONSE_STATUS.KO,
          };

    return message;
  }
}
