import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { AllBestProductsComponent } from './all-best-products/all-best-products.component';
import { AppComponent } from './app.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { ProductsPageComponent } from './products-page/products-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'loginPage', component: LoginPageComponent },
  { path: 'aboutPage', component: AboutPageComponent },
  { path: 'productsPage/:cat/:subcat', component: ProductsPageComponent },
  { path: 'allBestProducts', component: AllBestProductsComponent },
  { path: 'productDescription', component: ProductDescriptionComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
