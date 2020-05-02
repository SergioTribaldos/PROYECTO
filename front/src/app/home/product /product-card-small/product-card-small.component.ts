import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Product, Condition } from '../model/product';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { setConditionClass } from '../constants/functions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card-small',
  templateUrl: './product-card-small.component.html',
  styleUrls: ['./product-card-small.component.css'],
})
export class ProductCardSmallComponent implements OnInit {
  @Input()
  product: Product;

  resumedDescriptionText: string;
  APIENDPOINT_BACKEND: string;

  constructor(private router: Router) {}

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
}
