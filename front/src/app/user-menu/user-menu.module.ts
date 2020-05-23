import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu.component';
import { UserProductsComponent } from './user-products/user-products.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: UserMenuComponent,
    children: [
      {
        path: 'user-products',
        component: UserProductsComponent,
      },
      {
        path: '**',
        component: UserProductsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [UserMenuComponent, UserProductsComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes),
    //EffectsModule.forFeature([UserProductEffects]),
  ],
})
export class UserMenuModule {}
