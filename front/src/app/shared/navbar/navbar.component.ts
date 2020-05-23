import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/model/user';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { getUser } from 'src/app/auth/store/auth.selectors';
import { map } from 'rxjs/operators';
import { getMergedRoute } from 'src/app/router/router-state.selectors';
import { PRODUCT_ACTIONS } from '../../home/product /store/product.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, ProductTags } from '../../home/product /model/product';
import { AuthActions } from 'src/app/auth/store/action-types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;
  isSubBarActivated$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(getUser));
    this.isSubBarActivated$ = this.store.pipe(
      select(getMergedRoute),
      map((url) => {
        return url.url.includes('all');
      })
    );
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
  searchByName({ target: { value } }) {
    if (!!value) {
      this.store.dispatch(
        PRODUCT_ACTIONS.searchProducts({ searchParams: { name: value } })
      );
    }
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
