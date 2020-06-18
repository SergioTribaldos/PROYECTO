import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { ActivatedRoute } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Product } from 'src/app/home/product/model/product';
import { selectOneProduct } from 'src/app/home/product/store/product.selector';
import { PRODUCT_ACTIONS } from 'src/app/home/product/store/product.actions';
import { setConditionClass } from 'src/app/home/product/constants/functions';
import { selectOneUserProduct } from 'src/app/user-menu/store/user-product.selectors';

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

    this.product$ = combineLatest(
      this.store.select(selectOneProduct(queryParams)),
      this.store.select(selectOneUserProduct(queryParams))
    ).pipe(
      map(([one, two]) => one || two),
      tap((product) => {
        this.store.dispatch(
          PRODUCT_ACTIONS.productViewed({ productId: product.id })
        );
      })
    );
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
}
