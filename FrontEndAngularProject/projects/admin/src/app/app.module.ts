import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AdminRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AddproductsPageComponent } from './addproducts-page/addproducts-page.component';
import { ProductlistPageComponent } from './productlist-page/productlist-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    AddproductsPageComponent,
    ProductlistPageComponent
  ],
  imports: [
    BrowserModule,
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class AdminModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: []
    }
  }
}