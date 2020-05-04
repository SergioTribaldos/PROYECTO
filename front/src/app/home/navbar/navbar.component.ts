import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/model/user';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { getUser } from 'src/app/auth/store/auth.selectors';
import { map } from 'rxjs/operators';
import { getMergedRoute } from 'src/app/router/router-state.selectors';
import { PRODUCT_ACTIONS } from '../product /store/product.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, ProductTags } from '../product /model/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user$: Observable<User>;
  isSubBarActivated$: Observable<boolean>;
  categoryList: Object = Object.entries(Category);
  tagsList: any;
  form: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.form = fb.group({
      minPrice: [null],
      maxPrice: [null],
    });

    this.tagsList = this.mergeCategoriesAndTags();
    console.log();
  }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(getUser));
    this.isSubBarActivated$ = this.store.pipe(
      select(getMergedRoute),
      map((url) => {
        return url.url.includes('all');
      })
    );
  }

  search() {
    this.store.dispatch(
      PRODUCT_ACTIONS.searchProducts({ searchParams: 'fdsfgsd' })
    );
  }

  unsetFormControlValue(formControlNames: string[]) {
    for (const formControlName of formControlNames) {
      this.form.get(formControlName).setValue(null);
    }
  }

  mergeCategoriesAndTags() {
    console.log(Object.values(ProductTags).map((arr) => arr.concat(arr)));
    return [...Object.values(Category)];
  }
}
