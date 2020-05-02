import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Picture } from 'src/pictures/pictures.entity';
import { PictureService } from 'src/pictures/pictures.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Picture])],
  controllers: [ProductsController],
  providers: [ProductsService, PictureService],
  exports: [TypeOrmModule, ProductsService, PictureService],
})
export class ProductsModule {}
