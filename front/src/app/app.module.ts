import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from './shared/shared.module';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HomeModule } from './home/home.module';
import { UserMenuModule } from './user-menu/user-menu.module';
import { AuthGuard } from './auth/login/login.guard';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { UserMenuComponent } from './user-menu/user-menu.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  {
    path: 'login',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'user-menu',
    loadChildren: './user-menu/user-menu.module#UserMenuModule',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [AppComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
      },
    }),

    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),

    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal,
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
