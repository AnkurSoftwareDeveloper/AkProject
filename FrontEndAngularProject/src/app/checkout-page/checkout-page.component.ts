import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MyServiceService } from '../services/my-service.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  cart: {};
  getProductsById:any = [];
  checkOutForm: FormGroup;
  totalPrice:number= 0;
  login_Id: any;
  
  constructor(private formBuilder: FormBuilder, private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute,
    private router: Router) { 

      this.cart = JSON.parse(localStorage.getItem('cart'));
      this.login_Id=(JSON.parse(localStorage.getItem('currentUser'))).user_id;
    }

    ngAfterContentChecked(){
      this.calculateTotal();
    }

    calculateTotal(){
      this.totalPrice=0;
      for (var i = 0; i < this.getProductsById.length; i++) {
        if (this.getProductsById[i].discount_price) {
          this.totalPrice += this.getProductsById[i].discount_price * this.cart[this.getProductsById[i].product_id];
        }
      }
    }

  ngOnInit(): void {
    for (var item in this.cart) {
      console.log("cartitem", item);
      this.myservice.getProductsById(item).subscribe((data)=>{
      this.getProductsById.push(data);
      console.log("getProductsById", this.getProductsById);
      })  
    }

    this.checkOutForm = this.formBuilder.group({
      itemsJson: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      zip_code: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', Validators.required],
      amount: ['', Validators.required],
      user_id: ['', Validators.required]
    });
  }

  get f() { return this.checkOutForm.controls; }

  onSubmit(){
    this.checkOutForm.controls['itemsJson'].setValue(JSON.stringify(this.getProductsById));
    this.checkOutForm.controls['city'].setValue("Patna");
    this.checkOutForm.controls['state'].setValue("Bihar");
    this.checkOutForm.controls['amount'].setValue(this.totalPrice);
    this.checkOutForm.controls['address'].setValue(this.f.address.value +" "+ this.f.address2.value);
    this.checkOutForm.controls['user_id'].setValue(this.login_Id);

    console.log(this.checkOutForm.value);

    this.http.post(environment.baseURL + '/api/checkout/', this.checkOutForm.value).subscribe(
      (response) => console.log(response),
      (error) => console.log(error));
  }

}
