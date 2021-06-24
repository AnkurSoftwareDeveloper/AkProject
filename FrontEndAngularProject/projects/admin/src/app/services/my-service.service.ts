import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

   constructor(private httpClient: HttpClient) { }

  public getCategory(){
    let endPoints="/api/category/"
    return this.httpClient.get(environment.baseURL+endPoints);
  }
  
  public getCategoryById(id:any) {
    let endPoints = "/api/categoryDetails/" + id;
    return this.httpClient.get(environment.baseURL + endPoints);
  }
  
  public addCategory(postData: Object) {
    let endPoints = "/api/category/"
    return this.httpClient.post(environment.baseURL + endPoints, postData);
  }
  
  public updateCategory(id:any, postData: Object) {
    let endPoints = "/api/categoryDetails/" + id +"/";
    return this.httpClient.put(environment.baseURL + endPoints, postData);
  }
  
  public deleteCategory(id:any) {
    let endPoints = "/api/categoryDetails/" + id;
    return this.httpClient.delete(environment.baseURL + endPoints);
  }

  /////////////////////////////////////////

  public getSubCategory(){
    let endPoints="/api/subcategory/"
    return this.httpClient.get(environment.baseURL+endPoints);
  }

  public getSubCategoryById(id:any) {
    let endPoints = "/api/subcategoryDetails/" + id;
    return this.httpClient.get(environment.baseURL + endPoints);
  }

  public addSubCategory(postData: Object) {
    let endPoints = "/api/subcategory/"
    return this.httpClient.post(environment.baseURL + endPoints, postData);
  }
  
  public updateSubCategory(id:any, postData: Object) {
    let endPoints = "/api/subcategoryDetails/" + id +"/";
    return this.httpClient.put(environment.baseURL + endPoints, postData);
  }
  
  public deleteSubCategory(id:any) {
    let endPoints = "/api/subcategoryDetails/" + id;
    return this.httpClient.delete(environment.baseURL + endPoints);
  }
  /////////////////////////////////////////

  public getProducts(){
    let endPoints="/api/product/"
    return this.httpClient.get(environment.baseURL+endPoints);
  }

  public getProductsById(id:any) {
    let endPoints = "/api/productDetails/" + id;
    return this.httpClient.get(environment.baseURL + endPoints);
  }

  public addProducts(postData: Object) {
    let endPoints = "/api/product/"
    return this.httpClient.post(environment.baseURL + endPoints, postData);
  }
  
  public updateProducts(postData: Object, id:any) {
    let endPoints = "/api/productDetails/" + id +"/";
    return this.httpClient.put(environment.baseURL + endPoints, postData);
  }
  
  public deleteProducts(id:any) {
    let endPoints = "/api/productDetails/" + id;
    return this.httpClient.delete(environment.baseURL + endPoints);
  }

/////////////////////////////////////////

public getStockAlert(){
  let endPoints="/api/stockalert/"
  return this.httpClient.get(environment.baseURL+endPoints);
}

public getStockAlertById(id:any) {
  let endPoints = "/api/stockalertDetails/" + id;
  return this.httpClient.get(environment.baseURL + endPoints);
}

public addStockAlert(postData: Object) {
  let endPoints = "/api/stockalert/"
  return this.httpClient.post(environment.baseURL + endPoints, postData);
}

public updateStockAlert(postData: Object, id:any) {
  let endPoints = "/api/stockalertDetails/" + id +"/";
  return this.httpClient.put(environment.baseURL + endPoints, postData);
}

public deleteStockAlert(id:any) {
  let endPoints = "/api/stockalertDetails/" + id;
  return this.httpClient.delete(environment.baseURL + endPoints);
}

////////////////////////////////////////////
public getMyOrder(postData: Object) {
  let endPoints = "/api/myorder/"
  return this.httpClient.post(environment.baseURL + endPoints, postData);
}

public getAllOrder() {
  let endPoints = "/api/myorder/"
  return this.httpClient.get(environment.baseURL+endPoints);
}

public getMyOrdertById(id:any) {
  let endPoints = "/api/myorderdetail/" + id;
  return this.httpClient.get(environment.baseURL + endPoints);
}

public getTracker(postData: Object) {
  let endPoints = "/api/tracker/"
  return this.httpClient.post(environment.baseURL + endPoints, postData);
}

/////////////////////////////////////////////////
public addOrderUpdate(postData: Object) {
  let endPoints = "/api/orderupdate/"
  return this.httpClient.post(environment.baseURL + endPoints, postData);
}

public getOrderDetails(){
  let endPoints="/api/orderupdate/"
  return this.httpClient.get(environment.baseURL+endPoints);
}

/////////////////////////////////////////////
public getAllAddress() {
  let endPoints = "/api/address/"
  return this.httpClient.get(environment.baseURL+endPoints);
}
public getAddressById(id:any) {
  let endPoints = "/api/addressdetails/" + id;
  return this.httpClient.get(environment.baseURL + endPoints);
}


/////////////////////////////////////////////
public getAllUser() {
  let endPoints = "/api/accounts/userprofile/"
  return this.httpClient.get(environment.baseURL+endPoints);
}
public getUserById(id:any) {
  let endPoints = "/api/accounts/userdetails/" + id;
  return this.httpClient.get(environment.baseURL + endPoints);
}
/////////////////////////////////////////

public getpinCode(){
  let endPoints="/api/pinCode/"
  return this.httpClient.get(environment.baseURL+endPoints);
}
}
