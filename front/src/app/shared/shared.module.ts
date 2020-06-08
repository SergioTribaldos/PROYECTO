import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { MaterialModule } from './material/material.module';

import { UploadFileInputComponent } from './upload-file-input/upload-file-input.component';
import { ChipsListComponent } from './chips-list/chips-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProductCardSmallComponent } from './product-card-small/product-card-small.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserInfoHeaderComponent } from './user-info-header/user-info-header.component';
import { RouterModule } from '@angular/router';
import { ChatService } from './chat.service';

@NgModule({
  declarations: [
    MapComponent,
    MapDialogComponent,
    UploadFileInputComponent,
    ChipsListComponent,
    NavbarComponent,
    SearchBarComponent,
    ProductCardSmallComponent,
    ProductDetailComponent,
    UserInfoHeaderComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, NgbModule],
  exports: [
    MapComponent,
    UploadFileInputComponent,
    ChipsListComponent,
    NavbarComponent,
    SearchBarComponent,
    ProductCardSmallComponent,
    ProductDetailComponent,
    UserInfoHeaderComponent,
  ],
})
export class SharedModule {}
