import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyServiceService } from '../services/my-service.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  products: any[];
  categoryId: any;
  subCategoryId: any;
  getSubCategoryById: any;
  getCategoryById: any;
  categ: any;
  
  constructor(private myservice: MyServiceService, private route : ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.categoryId = params['cat'];
      this.subCategoryId = params['subcat'];
        console.log(this.categoryId,this.subCategoryId); // you should have your id here.
        this.ngOnInit();
      });
  }

  ngOnInit(): void {
    this.myservice.getProducts().subscribe((data: any[])=>{
      this.products = data;
      console.log("allproducts", this.products);
    })  

    this.myservice.getCategoryById(this.categoryId).subscribe((data)=>{
      this.categ = data;
      this.getCategoryById = this.categ.category_name;
      console.log("getCategoryById", this.getCategoryById);
    })  

    if(this.subCategoryId !== "null"){
      this.myservice.getSubCategoryById(this.subCategoryId).subscribe((data)=>{
        this.categ = data;
        this.getSubCategoryById = this.categ.subCategory_name;
        console.log("getSubCategoryById", this.getSubCategoryById);
      })  
    }

  }

  ngOnChanges(): void {
    this.myservice.getProducts().subscribe((data: any[])=>{
      this.products = data;
      console.log("allproducts", this.products);
    })  

    this.myservice.getCategoryById(this.categoryId).subscribe((data)=>{
      this.categ = data;
      this.getCategoryById = this.categ.category_name;
      console.log("getCategoryById", this.getCategoryById);
    })  

    if(this.subCategoryId !== "null"){
      this.myservice.getSubCategoryById(this.subCategoryId).subscribe((data)=>{
        this.categ = data;
        this.getSubCategoryById = this.categ.subCategory_name;
        console.log("getSubCategoryById", this.getSubCategoryById);
      })  
    }

  }

  ConvertToJSON(prod: any) {
  //  console.log("ConvertToJSON", prod);
    var data = [];
    data.push(prod);
    //console.log(data);
    return data;
}

}
