import { Picture } from 'src/pictures/pictures.entity';
import { User } from 'src/user/user.entity';

export class ProductResponseDto {
  title: string;
  categories: string;
  condition: 'mint' | 'semi_new' | 'used';
  description: string;
  pictures: Picture[];
  price: number;
  accept_changes: boolean;
  price_negotiable: boolean;
  distance_to_user: number;
  user: User;
}
