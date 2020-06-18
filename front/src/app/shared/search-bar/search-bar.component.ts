import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  Category,
  ProductTags,
  Condition,
} from '../../home/product/model/product';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { BUTTONS_LIST } from './constants';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { PRODUCT_ACTIONS } from '../../home/product/store/product.actions';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  categoryList: Object = Object.entries(Category);
  conditionList: Object = Object.values(Condition);
  tagsList: any;
  conditionTagsList: any;
  form: FormGroup;
  buttonsList = BUTTONS_LIST;

  @ViewChildren(MatMenuTrigger) menuList: QueryList<MatMenuTrigger>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.form = fb.group({
      minPrice: [null],
      maxPrice: [null],
      searchTags: [null],
      maxDistance: [null],
      conditionTags: [null],
    });

    this.tagsList = this.mergeCategoriesAndTags();
    this.conditionTagsList = this.conditionList;
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

  setSearchTags(val) {
    this.form.patchValue({ searchTags: val });
  }

  setConditionTags(val) {
    this.form.patchValue({ conditionTags: val });
  }

  closeMenu() {
    this.menuList.map((menu) => menu.closeMenu());
  }

  search() {
    this.deleteFormNullValues();
    const hasSearchFilters = Object.values(this.form.controls).some(
      ({ value }) => value
    );

    this.store.dispatch(
      PRODUCT_ACTIONS.setHasSearchFilters({ hasSearchFilters })
    );

    hasSearchFilters
      ? this.searchProductsWithParams()
      : this.performFirstProductsLoading();

    this.closeMenu();
  }

  deleteFormNullValues() {
    Object.keys(this.form.value).forEach(
      (key) => this.form.value[key] === null && delete this.form.value[key]
    );
  }

  searchProductsWithParams() {
    this.store.dispatch(
      PRODUCT_ACTIONS.searchProducts({ searchParams: this.form.value })
    );
  }

  performFirstProductsLoading() {
    this.store.dispatch(PRODUCT_ACTIONS.resetResultsSkipped());
    this.store.dispatch(PRODUCT_ACTIONS.loadProducts());
  }
}
