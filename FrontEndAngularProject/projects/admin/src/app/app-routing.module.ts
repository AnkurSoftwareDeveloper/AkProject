import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AddproductsPageComponent } from './addproducts-page/addproducts-page.component';
import { ProductlistPageComponent } from './productlist-page/productlist-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { SubcategoryPageComponent } from './subcategory-page/subcategory-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './_guards';
import { OrderlistPageComponent } from './orderlist-page/orderlist-page.component';
import { OrderdetailsPageComponent } from './orderdetails-page/orderdetails-page.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {path: '', component: DashboardPageComponent, canActivate: [AuthGuard]},
  {path: 'addproducts', component: AddproductsPageComponent, canActivate: [AuthGuard]},
  {path: 'productlist', component: ProductlistPageComponent, canActivate: [AuthGuard]},
  {path: 'category', component: CategoryPageComponent, canActivate: [AuthGuard]},
  {path: 'subcategory', component: SubcategoryPageComponent, canActivate: [AuthGuard]},
  {path: 'orderlist', component: OrderlistPageComponent, canActivate: [AuthGuard]},
  {path: 'orderdetails/:ord', component: OrderdetailsPageComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserPageComponent, canActivate: [AuthGuard]},
  {path: 'adminlogin', component: LoginPageComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
