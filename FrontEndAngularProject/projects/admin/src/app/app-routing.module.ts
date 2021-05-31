import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AddproductsPageComponent } from './addproducts-page/addproducts-page.component';
import { ProductlistPageComponent } from './productlist-page/productlist-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { SubcategoryPageComponent } from './subcategory-page/subcategory-page.component';

const routes: Routes = [
  {path: '', component: DashboardPageComponent},
  {path: 'addproducts', component: AddproductsPageComponent},
  {path: 'productlist', component: ProductlistPageComponent},
  {path: 'category', component: CategoryPageComponent},
  {path: 'subcategory', component: SubcategoryPageComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
