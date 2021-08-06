import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyServiceService } from 'projects/admin/src/app/services/my-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addproducts-page',
  templateUrl: './addproducts-page.component.html',
  styleUrls: ['./addproducts-page.component.css']
})
export class AddproductsPageComponent implements OnInit {

  category: any[];
  subCategory: any[];
  stockAlert: any[];
  base64Image:any;
  addproduct: FormGroup;
  constructor(private formBuilder: FormBuilder,private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute) { 
    
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

    this.myservice.getStockAlert().subscribe((data: any[])=>{
      this.stockAlert = data;
      console.log("getStockAlert", this.stockAlert);
    })  


    this.addproduct = this.formBuilder.group({
      product_name: ['', [Validators.required]],
      description: ['', Validators.required],
      category: ['', [Validators.required]],
      subcategory: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discount_price: ['', [Validators.required]],
      stockalert: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  onChange(event) {
    console.log(event)
    let me = this;
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        console.log(file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          //me.modelvalue = reader.result;
          console.log(reader.result);
          me.base64Image = reader.result;
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
    }

  onSubmit() {
    const formData = new FormData();
    formData.append('product_name', this.addproduct.get('product_name').value);
    formData.append('description', this.addproduct.get('description').value);
    formData.append('category', this.addproduct.get('category').value);
    formData.append('subcategory', this.addproduct.get('subcategory').value);
    formData.append('quantity', this.addproduct.get('quantity').value);
    formData.append('price', this.addproduct.get('price').value);
    formData.append('discount_price', this.addproduct.get('discount_price').value);
    formData.append('stockalert', this.addproduct.get('stockalert').value);
    formData.append('image', this.base64Image);
    
    formData.forEach((value, key) => {
      console.log("key %s: value %s", key, value);
      })
    this.myservice.addProducts(formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error));
  }

}
