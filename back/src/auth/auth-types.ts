export interface UserMeDto {
  readonly email: string;
  readonly password: string;
}

export interface UserMeDtoResponse {
  id?: number;
  name?: string;
  email?: string;
  lat?: string;
  lng?: string;
  access_token?: string;
  status: string;
}

export enum RESPONSE_STATUS {
  OK = 'ok',
  KO = 'ko',
}
