import { Product } from 'src/app/home/product/model/product';

export interface ProductMiniature {
  conversationId: number;
  pictureUrl: string;
  title: string;
  buyerId: string;
  sellerId: string;
  product: Product;
  recieverUserName: string;
}
