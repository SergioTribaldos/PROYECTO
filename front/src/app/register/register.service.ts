import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegisterDto } from './user-register.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(userData: UserRegisterDto) {
    return this.http.post<any>(
      `${environment.APIENDPOINT_BACKEND}/user/register`,
      userData
    );
  }
}
