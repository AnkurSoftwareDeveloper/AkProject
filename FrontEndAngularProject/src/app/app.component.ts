import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MyServiceService } from './services/my-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  category: any[];
  subCategory: any[];

  // postData = 
  // {
  //   "category_name": "Fruits & Vegetables"
  // };

  constructor(private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute) {


   }
  
   ngOnInit(): void {

    this.myservice.getCategory().subscribe((data: any[])=>{
      this.category = data;
      console.log("allcategory", this.category);
    })  
    
    this.myservice.getSubCategory().subscribe((data: any[])=>{
      this.subCategory = data;
      console.log("allsubcategory", this.subCategory);
    })  

}

// public getPosts(){
//   let endPoints="api/category/"
//     this.http.get(environment.baseURL+endPoints).subscribe(data => {
//       this.category = data;
//     console.log("allpost",data);
//   });
// }

// public getPostById() {
//   let id: number = 2;
//   let endPoints = "api/categoryDetails/" + id;
//   this.http.get(environment.baseURL + endPoints).subscribe(data => {
//     console.log(data);
//     this.category = data;
//     this.categoryData=this.category.category_name;
//     console.log("byId", this.category.category_name);
//   });
// }

// public addPost(postData: Object) {
//   let endPoints = "api/category/"
//   this.http.post(environment.baseURL + endPoints, postData).subscribe(data => {
//     this.category = data;
//     console.log("postdata",data);
//   });
// }

// public updatePost(postData: Object) {
//   let endPoints = "api/categoryDetails/1/"
//   this.http.put(environment.baseURL + endPoints, postData).subscribe(data => {
//     this.category = data;
//     console.log("updatedata",data);
//   });
// }

// public deletePost() {
//   let endPoints = "api/categoryDetails/5/"
//   this.http.delete(environment.baseURL + endPoints).subscribe(data => {
//     this.category = data;
//     console.log("deletePost",data);
//   });
// }

}
