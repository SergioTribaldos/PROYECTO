import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductUploadDto } from '../product /model/product.dto';
import { environment } from 'src/environments/environment';
import { Product } from '../product /model/product';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { getUserId } from 'src/app/auth/store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getAllProducts(user): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.APIENDPOINT_BACKEND}/products/all`,
      { params: user }
    );
  }

  searchProducts(params): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.APIENDPOINT_BACKEND}/products/search`,
      { params: { params: params } }
    );
  }

  uploadProduct(formData: FormData) {
    return this.http.post(
      `${environment.APIENDPOINT_BACKEND}/products/upload`,
      formData
    );
  }
}
