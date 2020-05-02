import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from '../home/navbar/navbar.component';
import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './store/shared-effects';
import { UploadFileInputComponent } from './upload-file-input/upload-file-input.component';

@NgModule({
  declarations: [MapComponent, MapDialogComponent, UploadFileInputComponent],
  imports: [
    CommonModule,
    MaterialModule,
    EffectsModule.forFeature([SharedEffects]),
  ],
  exports: [MapComponent, UploadFileInputComponent],
})
export class SharedModule {}
