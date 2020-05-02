import { User } from 'src/app/auth/model/user';

export interface ProductUploadDto {
  title: string;

  categories: string;

  condition: 'mint' | 'semi_new' | 'used';

  description: string;

  images: File[];

  price: number;

  accept_changes: boolean;

  price_negotiable: boolean;

  userId: string;
}
