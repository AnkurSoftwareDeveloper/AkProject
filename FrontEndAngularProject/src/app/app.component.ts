import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MyServiceService } from './services/my-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products: any;
  productsData: any;

  postData = 
  {
      "fullname": "anku5",
      "email": "ak@gmail.com",
      "contact":"6476744",
      "message":"price"
  };

  constructor(private myservice: MyServiceService,private http: HttpClient,) {
    console.log('It works here');
    this.getPosts();
    // this.getPostById();
    // this.addPost(this.postData);
     this.updatePost(this.postData);
     //this.deletePost();
   }
  
   ngOnInit(): void {

   this.myservice.sendGetRequest().subscribe((data: any[])=>{
    console.log(data);
    this.products = data;
    
    const arr = [];

    // extract upin, mtype, land from the original array
    for (let item of data) {
      arr.push({
        fullname: item.fullname,
        email: item.email,
        contact: item.contact,
        message: item.message
      });
    }
    console.log(arr[1].fullname);
  })  
   
}

public getPosts(){
  let endPoints="api/ContactForms/"
    this.http.get(environment.baseURL+endPoints).subscribe(data => {
    console.log("allpost",data);
  });
}

public getPostById() {
  let id: number = 1;
  let endPoints = "api/ContactFormsDetails/" + id;
  this.http.get(environment.baseURL + endPoints).subscribe(data => {
    console.log(data);
    this.productsData= data;
    console.log("byId", this.productsData);
  });
}

public addPost(postData: Object) {
  let endPoints = "api/ContactForms/"
  this.http.post(environment.baseURL + endPoints, postData).subscribe(data => {
    console.log("postdata",data);
  });
}

public updatePost(postData: Object) {
  let endPoints = "api/ContactFormsDetails/4/"
  this.http.put(environment.baseURL + endPoints, postData).subscribe(data => {
    console.log("updatedata",data);
  });
}

public deletePost() {
  let endPoints = "api/ContactFormsDetails/5/"
  this.http.delete(environment.baseURL + endPoints).subscribe(data => {
    console.log("deletePost",data);
  });
}

}
