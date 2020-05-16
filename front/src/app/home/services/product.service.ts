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

  searchProducts(user, params): Observable<Product[]> {
    console.log(params);
    return this.http.post<Product[]>(
      `${environment.APIENDPOINT_BACKEND}/products/search`,
      { user, params }
    );
  }

  uploadProduct(formData: FormData) {
    return this.http.post<any>(
      `${environment.APIENDPOINT_BACKEND}/products/upload`,
      formData
    );
  }

  addViewedProduct(productId) {
    console.log(productId);
    return this.http.get<any>(
      `${environment.APIENDPOINT_BACKEND}/products/viewed`,
      {
        params: { productId },
      }
    );
  }
}
