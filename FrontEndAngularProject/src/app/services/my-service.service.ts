import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private httpClient: HttpClient) { }
  public sendGetRequest(){
    return this.httpClient.get(environment.baseURL + 'api/category/');
  }

}
