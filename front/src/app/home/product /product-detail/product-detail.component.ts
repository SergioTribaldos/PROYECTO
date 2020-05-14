import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { AppState } from 'src/app/reducers';
import { Router, ActivatedRoute } from '@angular/router';
import { setConditionClass } from '../constants/functions';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { selectOneProduct } from '../store/product.selector';
import { environment } from 'src/environments/environment';
import { concatMap, map, tap } from 'rxjs/operators';
import { PRODUCT_ACTIONS } from '../store/product.actions';

@Component({
  selector: 'dialog-overview-example-dialog',
  template: '<img style="height:800px;max-width:100%" [src]="data">',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product>;
  toggleExpandMap = false;
  APIENDPOINT_BACKEND;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.APIENDPOINT_BACKEND = environment.APIENDPOINT_BACKEND;
    const queryParams = this.route.snapshot.params.id;
    this.product$ = this.store.pipe(
      select(selectOneProduct(queryParams)),
      tap(({ id }) => {
        this.store.dispatch(PRODUCT_ACTIONS.productViewed({ productId: id }));
      })
    );
    this.addViewToProduct();
  }

  setConditionClass(condition) {
    return setConditionClass(condition);
  }

  openDialog(image): void {
    this.dialog.open(DialogOverviewExampleDialog, {
      data: this.APIENDPOINT_BACKEND + '/' + image,
    });
  }

  expandMap() {
    this.toggleExpandMap = !this.toggleExpandMap;
  }

  addViewToProduct() {}
}
