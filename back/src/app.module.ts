import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Picture } from './pictures/pictures.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'vps730338.ovh.net',
      port: 3306,
      username: 'SERGIO',
      password: '1234',
      database: 'PROYECTO',
      entities: [User, Product, Picture],
      synchronize: true,
    }),
    ProductsModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
