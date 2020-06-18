import { User } from 'src/app/auth/model/user';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: Category;
  pictures: Picture[];
  price: number;
  date_published: string;
  condition: Condition;
  viewed_times: number;
  accept_changes: boolean;
  price_negotiable: boolean;
  lat?: number;
  lng?: number;
  distance_to_user?: number;
  uploaded_at?: string;
  user?: User;
  productPicture?: { id: number; url: string };
}

export interface Picture {
  id: number;
  url: string;
}

export enum Category {
  Guitarras = 'Guitarras',
  Bajos = 'Bajos',
  Amplificadores = 'Amplificadores',
  Percusion = 'Percusion',
  Teclados = 'Teclados',
  pa = 'Sistemas P.A',
  Vientos = 'Vientos',
}
export enum Condition {
  mint = 'Nuevo',
  semi_new = 'Semi-nuevo',
  used = 'Usado',
}

export const ProductTags = {
  Guitarras: [
    '7-Cuerdas',
    'Acústica',
    'Eléctrica',
    'Semi-caja',
    'Clásica',
    'Española',
    'Single-coil',
    'Humbucker',
  ],
  Bajos: ['5-Cuerdas', 'Fretless'],
  Amplificadores: [
    'Válvulas',
    'Transistores',
    'Combo',
    'Cabezal',
    'Pantalla',
    'Pedales',
    'Multi efectos',
  ],
  Percusion: ['Kit', 'Timbal', 'Electrónica', 'Caja', 'Bombo'],
  Teclados: ['Hammond', 'Eléctrico', 'Clásico', 'Efectos', 'Piano'],
  Vientos: [
    'Viento madera',
    'Viento metal',
    'Saxofon',
    'Oboe',
    'Flauta',
    'Trompeta',
    'Trombon',
  ],
};
