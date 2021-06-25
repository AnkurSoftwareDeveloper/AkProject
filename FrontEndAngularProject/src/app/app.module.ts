import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { AllBestProductsComponent } from './all-best-products/all-best-products.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { MyServiceService } from './services/my-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page/cart-page.component';
import { RouterModule } from '@angular/router';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { MyorderComponent } from './myorder/myorder.component';
import { DatePipe } from '@angular/common';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MyaccountComponent } from './myaccount/myaccount.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    AboutPageComponent,
    ProductsPageComponent,
    ProductDescriptionComponent,
    AllBestProductsComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    CartPageComponent,
    CheckoutPageComponent,
    MyorderComponent,
    ChangepasswordComponent,
    ForgotpasswordComponent,
    SearchPageComponent,
    MyaccountComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [MyServiceService,DatePipe,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
