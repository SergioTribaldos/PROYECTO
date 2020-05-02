import { Coordinates } from '@shared/map/map.component';

export interface UserRegisterDto {
  name: string;
  email: string;
  password: string;
  lat: string;
  lng: string;
}
