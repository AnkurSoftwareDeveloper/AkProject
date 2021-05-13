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
  category: any;
  categoryData: any;

  postData = 
  {
    "category_name": "Fruits & Vegetables"
  };

  constructor(private myservice: MyServiceService,private http: HttpClient) {
    console.log('It works here');
    this.getPosts();
     this.getPostById();
    // this.addPost(this.postData);
     this.updatePost(this.postData);
     //this.deletePost();
   }
  
   ngOnInit(): void {

  this.myservice.getCategory().subscribe((data: any[])=>{
       console.log(data);
       this.category = data;
        
       console.log("allpost", this.category);
     })  
}

public getPosts(){
  let endPoints="api/category/"
    this.http.get(environment.baseURL+endPoints).subscribe(data => {
      this.category = data;
    console.log("allpost",data);
  });
}

public getPostById() {
  let id: number = 2;
  let endPoints = "api/categoryDetails/" + id;
  this.http.get(environment.baseURL + endPoints).subscribe(data => {
    console.log(data);
    this.category = data;
    this.categoryData=this.category.category_name;
    console.log("byId", this.category.category_name);
  });
}

public addPost(postData: Object) {
  let endPoints = "api/category/"
  this.http.post(environment.baseURL + endPoints, postData).subscribe(data => {
    this.category = data;
    console.log("postdata",data);
  });
}

public updatePost(postData: Object) {
  let endPoints = "api/categoryDetails/1/"
  this.http.put(environment.baseURL + endPoints, postData).subscribe(data => {
    this.category = data;
    console.log("updatedata",data);
  });
}

public deletePost() {
  let endPoints = "api/categoryDetails/5/"
  this.http.delete(environment.baseURL + endPoints).subscribe(data => {
    this.category = data;
    console.log("deletePost",data);
  });
}

}
