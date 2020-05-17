/* eslint-disable @typescript-eslint/camelcase */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Get,
  Req,
  Query,
} from '@nestjs/common';
import * as fs from 'fs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BASE_UPLOAD_FOLDER, multerConfig } from './constants';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { PictureService } from 'src/pictures/pictures.service';
import { ProductResponseDto } from './product-response.dto';
import {
  SUCCESFUL_MESSAGES,
  RESPONSE_STATUS,
  ERROR_MESSAGES,
} from 'src/shared/constants';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductsService,
    private readonly pictureService: PictureService,
  ) {}

  @Post('all')
  getAllProducts(@Body() user): Promise<ProductResponseDto[]> {
    return this.productService.getAllProducts(user);
  }

  @Post('user')
  getUserProducts(@Body() user): Promise<ProductResponseDto[]> {
    return this.productService.getUserProducts(user);
  }

  @Get('viewed')
  addViewedProduct(@Query() { productId }) {
    return this.productService.addViewedProduct(productId);
  }

  @Post('search')
  async searchProducts(@Body() searchParams) {
    return this.productService.getProductsFiltered(
      searchParams.user,
      searchParams.params,
    );
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 8, multerConfig))
  async uploadFile(@UploadedFiles() files, @Body() userData: any) {
    try {
      const product = this.parseData(userData);
      const productId = (await this.productService.saveProduct(product))
        .identifiers[0].id;

      this.renameFolder({
        tempFolder: userData.userId,
        newFolder: productId,
      });

      const picturesURLs = this.populatePicturesURLs({
        files: files,
        productId: productId,
      });

      this.pictureService.saveImages({
        picturesURLs: picturesURLs,
        productId: productId,
      });

      return {
        msg: SUCCESFUL_MESSAGES.PRODUCT_UPLOAD,
        status: RESPONSE_STATUS.OK,
      };
    } catch (error) {
      return {
        msg: ERROR_MESSAGES.PRODUCT_UPLOAD_FAIL,
        status: RESPONSE_STATUS.KO,
      };
    }
  }

  parseData(userData): Product {
    const product = new Product();
    product.title = userData.title;
    product.categories = userData.categories;
    product.condition = userData.condition;
    product.description = userData.description;
    product.price = userData.price;
    product.accept_changes = userData.accept_changes;
    product.price_negotiable = userData.price_negotiable;
    product.user = userData.userId;

    return product;
  }

  renameFolder({ tempFolder, newFolder }): void {
    const tempAddress = `${BASE_UPLOAD_FOLDER}${tempFolder}/`;
    const newAddress = `${BASE_UPLOAD_FOLDER}${newFolder}/`;

    fs.renameSync(tempAddress, newAddress);
  }

  populatePicturesURLs({ files, productId }): string[] {
    const picturesURLs = [];
    for (const { filename } of files) {
      picturesURLs.push(`images/${productId}/${filename} `);
    }
    return picturesURLs;
  }
}
