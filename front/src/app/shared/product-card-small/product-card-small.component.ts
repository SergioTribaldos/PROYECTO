import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../home/product/model/product';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Router } from '@angular/router';
import { setConditionClass } from '../../home/product/constants/functions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card-small',
  templateUrl: './product-card-small.component.html',
  styleUrls: ['./product-card-small.component.css'],
})
export class ProductCardSmallComponent implements OnInit {
  @Input()
  product: Product;

  @Input()
  isUserProduct: boolean;

  @Output()
  deleteProductEmitter = new EventEmitter<number>();

  resumedDescriptionText: string;
  APIENDPOINT_BACKEND: string;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.APIENDPOINT_BACKEND = environment.APIENDPOINT_BACKEND;
    this.resumedDescriptionText = this.cutDescriptionText();
  }

  cutDescriptionText() {
    return this.product.description.length > 350
      ? this.product.description.slice(0, 350) + '...'
      : this.product.description;
  }
  goTo() {
    this.router.navigate([`home/product/${this.product.id}`]);
  }

  setConditionClass() {
    return setConditionClass(this.product.condition);
  }

  deleteProduct(event) {
    event.stopPropagation();
    this.deleteProductEmitter.emit(this.product.id);
  }
}
