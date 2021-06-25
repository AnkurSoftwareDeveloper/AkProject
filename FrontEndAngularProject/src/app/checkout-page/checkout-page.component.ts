import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyServiceService } from '../services/my-service.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  cart: {};
  getProductsById:any = [];
  addressForm: FormGroup;
  totalPrice:number= 0;
  login_Id: any;
  expanded: boolean;
  pincode: any[];
  userAddress: any;
  radioAddData: any;
  radioPayData: any;
  
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

    this.expanded = false

    this.myservice.getpinCode().subscribe((data: any[])=>{
      this.pincode = data;
      console.log("getpinCode", this.pincode);
    })  
    const loginId={
      "user_id": this.login_Id
    }
    console.log(loginId);

    this.myservice.getAddressByUser(loginId).subscribe((data)=>{
      this.userAddress= data;
      console.log("userAddress", this.userAddress);
      })  

    console.log("cartitem", this.cart);
    for (var item in this.cart) {
      console.log("cartitem", item);
      this.myservice.getProductsById(item).subscribe((data)=>{
      this.getProductsById.push(data);
      console.log("getProductsById", this.getProductsById);
      })  
    }

    this.addressForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      pin_code: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  pin(pinid: any){
    for (var item of this.pincode) {
        if(item.pinCode_id==pinid)
          return item.pin_code
    }
  }

  get f() { return this.addressForm.controls; }

  addressSubmit(){
    this.addressForm.controls['city'].setValue("Patna");
    this.addressForm.controls['state'].setValue("Bihar");
    this.addressForm.controls['address'].setValue(this.f.address.value +" "+ this.f.address2.value);
    this.addressForm.controls['user_id'].setValue(this.login_Id);

    console.log(this.addressForm.value);

    this.myservice.addAddress(this.addressForm.value).subscribe((data: any[])=>{
      console.log("addressForm", data);
        window. location. reload();
    })  
  }

  onAddChange(addRadio: any){
    this.radioAddData=addRadio;
  }
  onPayChange(payRadio: any){
    this.radioPayData=payRadio;
  }
  
  checkOutSubmit(){
    let checkOut={
      itemsJson : JSON.stringify(this.getProductsById),
      itemsQuntJson : JSON.stringify(this.cart),
      amount : this.totalPrice,
      user_id : this.login_Id,
      address : this.radioAddData,
      paymentStatus : this.radioPayData
    }

    console.log("checkout", checkOut);
   
    this.myservice.checkout(checkOut).subscribe((data: any[])=>{
      console.log("checkout", data);

    this.cart = {};
    localStorage.setItem('cart', JSON.stringify(this.cart));

      this.router.navigate(['/']).then(() => {
        window. location. reload();
        });
      alert("Your order is successfully placed Thanks...");
    })  
  }

}
