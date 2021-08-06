import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyServiceService } from 'projects/admin/src/app/services/my-service.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-editproduct-page',
  templateUrl: './editproduct-page.component.html',
  styleUrls: ['./editproduct-page.component.css']
})
export class EditproductPageComponent implements OnInit {

  category: any[];
  subCategory: any[];
  stockAlert: any[];
  base64Image:any;
  editproduct: FormGroup;
  proId: any;
  getProductsById: any;
  envURL:any;
  toggleButton: boolean = false;

  constructor(private formBuilder: FormBuilder,private myservice: MyServiceService,private http: HttpClient,
    private route : ActivatedRoute) { 
      this.envURL =environment.baseURL;

      this.route.params.subscribe(params => {
        this.proId = params['pro'];
          console.log(this.proId); 
        });
    }

  ngOnInit(): void {
    this.myservice.getProductsById(this.proId).subscribe((data)=>{
      this.getProductsById = data;
      console.log("getProductsById", this.getProductsById);

      this.editproduct.setValue({
        product_name: this.getProductsById.product_name,
        description: this.getProductsById.description,
        category: this.getProductsById.category,
        subcategory: this.getProductsById.subcategory,
        quantity: this.getProductsById.quantity,
        price: this.getProductsById.price,
        discount_price: this.getProductsById.discount_price,
        stockalert: this.getProductsById.stockalert
      });
    })  

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


    this.editproduct = this.formBuilder.group({
      product_name: ['', [Validators.required]],
      description: ['', Validators.required],
      category: ['', [Validators.required]],
      subcategory: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discount_price: ['', [Validators.required]],
      stockalert: ['', [Validators.required]],
    });

    
  }

  onChange(event) {
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
    console.log('this.base64Image: ', this.base64Image);
    const formData = new FormData();
    formData.append('product_name', this.editproduct.get('product_name').value);
    formData.append('description', this.editproduct.get('description').value);
    formData.append('category', this.editproduct.get('category').value);
    formData.append('subcategory', this.editproduct.get('subcategory').value);
    formData.append('quantity', this.editproduct.get('quantity').value);
    formData.append('price', this.editproduct.get('price').value);
    formData.append('discount_price', this.editproduct.get('discount_price').value);
    formData.append('stockalert', this.editproduct.get('stockalert').value);
    if(this.base64Image!=null || this.base64Image!=undefined)
        formData.append('image', this.base64Image);
    
    formData.forEach((value, key) => {
      console.log("key %s: value %s", key, value);
      })
    this.myservice.updateProducts(formData,this.proId).subscribe(
      (response) => console.log(response),
      (error) => console.log(error));
  }


}
