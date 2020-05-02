import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserMeDto } from '../model/user-me.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(userData: UserMeDto) {
    return this.http.post<any>(
      `${environment.APIENDPOINT_BACKEND}/auth/login`,
      userData
    );
  }

  checkToken(token: string) {
    return this.http.get<any>(`${environment.APIENDPOINT_BACKEND}/auth/token`, {
      params: new HttpParams().set('token', token),
    });
  }
}
