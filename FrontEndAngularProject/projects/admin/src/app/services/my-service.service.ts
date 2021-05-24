import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

   constructor(private httpClient: HttpClient) { }

  public getCategory(){
    let endPoints="api/category/"
    return this.httpClient.get(environment.baseURL+endPoints);
  }
  
  public getCategoryById(id:any) {
    let endPoints = "api/categoryDetails/" + id;
    return this.httpClient.get(environment.baseURL + endPoints);
  }
  
  public addCategory(postData: Object) {
    let endPoints = "api/category/"
    return this.httpClient.post(environment.baseURL + endPoints, postData);
  }
  
  public updateCategory(postData: Object) {
    let endPoints = "api/categoryDetails/1/"
    return this.httpClient.put(environment.baseURL + endPoints, postData);
  }
  
  public deleteCategory() {
    let endPoints = "api/categoryDetails/5/"
    return this.httpClient.delete(environment.baseURL + endPoints);
  }

  /////////////////////////////////////////

  public getSubCategory(){
    let endPoints="api/subcategory/"
    return this.httpClient.get(environment.baseURL+endPoints);
  }

  public getSubCategoryById(id:any) {
    let endPoints = "api/subcategoryDetails/" + id;
    return this.httpClient.get(environment.baseURL + endPoints);
  }
  /////////////////////////////////////////

  public getProducts(){
    let endPoints="api/product/"
    return this.httpClient.get(environment.baseURL+endPoints);
  }

  public getProductsById(id:any) {
    let endPoints = "api/productDetails/" + id;
    return this.httpClient.get(environment.baseURL + endPoints);
  }

  public addProducts(postData: Object) {
    let endPoints = "api/product/"
    return this.httpClient.post(environment.baseURL + endPoints, postData);
  }
  
  public updateProducts(postData: Object, id:any) {
    let endPoints = "api/productDetails/" + id;
    return this.httpClient.put(environment.baseURL + endPoints, postData);
  }
  
  public deleteProducts(id:any) {
    let endPoints = "api/productDetails/" + id;
    return this.httpClient.delete(environment.baseURL + endPoints);
  }

}
