import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';

import { NavbarComponent } from './navbar/navbar.component';
import { ProductListComponent } from './product /product-list/product-list.component';
import { ProductCardSmallComponent } from './product /product-card-small/product-card-small.component';
import { ProductDetailComponent } from './product /product-detail/product-detail.component';
import { ProductUploadComponent } from './product /product-upload/product-upload.component';
import { HomeEffects } from './product /store/product.effects';
import { productsReducer } from './product /store/product.reducers';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { UserInfoHeaderComponent } from './product /user-info-header/user-info-header.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductListComponent,
    ProductCardSmallComponent,
    ProductDetailComponent,
    NavbarComponent,
    ProductUploadComponent,
    SearchBarComponent,
    UserInfoHeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    HomeRoutingModule,
    MatDialogModule,
    NgbModule,
    StoreModule.forFeature('Products', productsReducer),
    EffectsModule.forFeature([HomeEffects]),
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
