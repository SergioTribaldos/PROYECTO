import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatDialogModule } from '@angular/material/dialog';

import { ProductUploadComponent } from './product /product-upload/product-upload.component';
import { ProductEffects } from './product /store/product.effects';
import { productsReducer } from './product /store/product.reducers';
import { UserProductEffects } from '../user-menu/store/user-product.effects';
import { userProductsReducer } from '../user-menu/store/user-product.reducers';
import { MainComponent } from './main/main.component';
import { chatReducer } from '../user-menu/chat/store/chat.reducers';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [HomeComponent, ProductUploadComponent, MainComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    HomeRoutingModule,
    MatDialogModule,
    InfiniteScrollModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
