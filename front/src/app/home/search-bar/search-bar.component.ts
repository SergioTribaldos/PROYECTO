import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Category, ProductTags } from '../product /model/product';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { BUTTONS_LIST } from './constants';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { PRODUCT_ACTIONS } from '../product /store/product.actions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  categoryList: Object = Object.entries(Category);
  tagsList: any;
  form: FormGroup;
  buttonsList = BUTTONS_LIST;

  @ViewChildren(MatMenuTrigger) menuList: QueryList<MatMenuTrigger>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.form = fb.group({
      minPrice: [null],
      maxPrice: [null],
      tags: [null],
      maxDistance: [null],
    });

    this.tagsList = this.mergeCategoriesAndTags();
  }

  ngOnInit(): void {}

  unsetFormControlValue(formControlNames: string[]) {
    for (const formControlName of formControlNames) {
      this.form.get(formControlName).setValue(null);
    }

    this.search();
  }

  mergeCategoriesAndTags() {
    const mergedTags = Object.values(ProductTags).reduce(
      (a, b) => [...a, ...b],
      []
    );
    const mergedCategories = Object.values(Category);
    return [...mergedCategories, ...mergedTags];
  }

  setTags(val) {
    this.form.patchValue({ tags: val });
  }

  closeMenu() {
    this.menuList.map((menu) => menu.closeMenu());
  }

  search() {
    Object.keys(this.form.value).forEach(
      (key) => this.form.value[key] === null && delete this.form.value[key]
    );

    console.log(this.form.value);
    this.closeMenu();
    this.store.dispatch(
      PRODUCT_ACTIONS.searchProducts({ searchParams: this.form.value })
    );
  }

  aa() {
    alert(8);
  }
}
