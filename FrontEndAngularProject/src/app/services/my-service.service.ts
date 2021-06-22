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
  
  public updateCategory(postData: Object) {
    let endPoints = "/api/categoryDetails/1/"
    return this.httpClient.put(environment.baseURL + endPoints, postData);
  }
  
  public deleteCategory() {
    let endPoints = "/api/categoryDetails/5/"
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
    let endPoints = "/api/productDetails/" + id;
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
  let endPoints = "/api/stockalertDetails/" + id;
  return this.httpClient.put(environment.baseURL + endPoints, postData);
}

public deleteStockAlert(id:any) {
  let endPoints = "/api/stockalertDetails/" + id;
  return this.httpClient.delete(environment.baseURL + endPoints);
}

/////////////////////////////////////////

public getpinCode(){
  let endPoints="/api/pinCode/"
  return this.httpClient.get(environment.baseURL+endPoints);
}
/////////////////////////////////////////

public getAddressByUser(postData: Object){
  let endPoints="/api/addressbyuser/"
  return this.httpClient.post(environment.baseURL + endPoints, postData);
}

public getAddresssById(id:any) {
  let endPoints = "/api/addressDetails/" + id;
  return this.httpClient.get(environment.baseURL + endPoints);
}

public addAddress(postData: Object) {
  let endPoints = "/api/address/"
  return this.httpClient.post(environment.baseURL + endPoints, postData);
}

public updateAddress(postData: Object, id:any) {
  let endPoints = "/api/addressDetails/" + id;
  return this.httpClient.put(environment.baseURL + endPoints, postData);
}

public deleteAddress(id:any) {
  let endPoints = "/api/addressDetails/" + id;
  return this.httpClient.delete(environment.baseURL + endPoints);
}

///////////////////////////////////
public getMyOrder(postData: Object) {
  let endPoints = "/api/myorder/"
  return this.httpClient.post(environment.baseURL + endPoints, postData);
}

public getTracker(postData: Object) {
  let endPoints = "/api/tracker/"
  return this.httpClient.post(environment.baseURL + endPoints, postData);
}

public getTrackAll(postData: Object) {
  let endPoints = "/api/trackall/"
  return this.httpClient.post(environment.baseURL + endPoints, postData);
}

public addOrderUpdate(postData: Object) {
  let endPoints = "/api/orderupdate/"
  return this.httpClient.post(environment.baseURL + endPoints, postData);
}

///////////////////////////////////////////
public addUser(postData: Object) {
  let endPoints = "/api/accounts/register/"
  return this.httpClient.post(environment.baseURL + endPoints, postData);
}

public changePassword(postData: Object) {
  let endPoints = "/api/accounts/changepassword/"
  return this.httpClient.put(environment.baseURL + endPoints, postData);
}

public forgetPassword(postData: Object) {
  let endPoints = "/api/accounts/passwordreset/"
  return this.httpClient.get(environment.baseURL + endPoints, postData);
}

public checkout(postData: Object) {
  let endPoints = "/api/checkout/"
  return this.httpClient.post(environment.baseURL + endPoints, postData);
}

}
