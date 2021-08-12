import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AdminRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AddproductsPageComponent } from './addproducts-page/addproducts-page.component';
import { ProductlistPageComponent } from './productlist-page/productlist-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { SubcategoryPageComponent } from './subcategory-page/subcategory-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrderlistPageComponent } from './orderlist-page/orderlist-page.component';
import { OrderdetailsPageComponent } from './orderdetails-page/orderdetails-page.component';
import {NgxPrintModule} from 'ngx-print';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers';
import { UserPageComponent } from './user-page/user-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { EditproductPageComponent } from './editproduct-page/editproduct-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    AddproductsPageComponent,
    ProductlistPageComponent,
    CategoryPageComponent,
    SubcategoryPageComponent,
    LoginPageComponent,
    OrderlistPageComponent,
    OrderdetailsPageComponent,
    UserPageComponent,
    ContactPageComponent,
    EditproductPageComponent
  ],
  imports: [
    BrowserModule,
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxPrintModule
  ],
  providers: [DatePipe,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
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