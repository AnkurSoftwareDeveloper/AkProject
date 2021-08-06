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
  addError: string;
  orderError: string;
  cartItem: any;
  
  constructor(private formBuilder: FormBuilder, private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute,
    private router: Router) { 

      this.cart = JSON.parse(localStorage.getItem('cart'));
      this.login_Id=(JSON.parse(localStorage.getItem('currentUser'))).user_id;
      
      if(Object.keys(this.cart).length == 0){
        alert("Your cart is empty");
        this.router.navigate(['/cart']);
      }
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
        this.cartItem=data;
        if(this.cartItem.stockalert==2){
          this.removeCartItem(this.cartItem.product_id);
        }
        else{
          this.getProductsById.push(data);
        }
      console.log("getProductsById", this.getProductsById);
      })  
    }

    this.addressForm = this.formBuilder.group({
      user_id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      address2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      pin_code: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });

    this.addressForm.valueChanges.subscribe(res => {
      this.addError='';
     })
  }

  removeCartItem(cartId:any){
    console.log(cartId);
    delete this.cart[cartId];
    localStorage.setItem('cart', JSON.stringify(this.cart));
    window.location.reload();
    console.log(this.cart);
    
  }

  pin(pinid: any){
    for (var item of this.pincode) {
        if(item.pinCode_id==pinid)
          return item.pin_code
    }
  }

  get f() { return this.addressForm.controls; }

  addValidation(){
    if(this.f.name.hasError('required')){
      this.addError = "name required";
      return
    }
    if(this.f.name.hasError('minlength') || this.f.name.hasError('maxlength')){
      this.addError = "Your name must contain between 2 to 50 characters.";
      return
    }
    if(this.f.phone.hasError('required')){
      this.addError = "phone number required";
      return
    }
    if(this.f.phone.hasError('pattern')){
      this.addError = "Invalid phone number";
      return
    }
    if(this.f.address.hasError('required')){
      this.addError = "address required";
      return
    }
    if(this.f.address.hasError('minlength') || this.f.address.hasError('maxlength')){
      this.addError = "Your address must contain between 3 to 200 characters.";
      return
    }
    if(this.f.address2.hasError('required')){
      this.addError = "address required";
      return
    }
    if(this.f.address2.hasError('minlength') || this.f.address2.hasError('maxlength')){
      this.addError = "Your address line 2 must contain between 3 to 200 characters.";
      return
    }
    if(this.f.pin_code.hasError('required')){
      this.addError = "pin_code required";
      return
    }

    this.addressForm.controls['city'].setValue("Patna");
    this.addressForm.controls['state'].setValue("Bihar");
    this.addressForm.controls['address'].setValue(this.f.address.value +" "+ this.f.address2.value);
    this.addressForm.controls['user_id'].setValue(this.login_Id);
    
    if(this.addressForm.valid)
    {
      this.addressSubmit();
    }
  }

  addressSubmit(){

    console.log(this.addressForm.value);

    this.myservice.addAddress(this.addressForm.value).subscribe((data: any[])=>{
      console.log("addressForm", data);
        window. location. reload();
    })  
  }

  onAddChange(addRadio: any){
    this.orderError='';
    for (var item of this.userAddress) {
      if(item.address_id==addRadio){
          this.radioAddData=item;
      }
    }
    
  }
  onPayChange(payRadio: any){
    this.radioPayData=payRadio;
    this.orderError='';
  }
  
  orderValidation(){
    if(this.radioAddData==null || this.radioAddData==undefined || this.radioAddData==""){
      this.orderError="Please add Address";
      return
    }

    if(this.radioPayData==null || this.radioPayData==undefined || this.radioPayData==""){
      this.orderError="Please select Payment option";
      return
    }

    this.checkOutSubmit();
  }

  checkOutSubmit(){
    let checkOut={
      itemsJson : JSON.stringify(this.getProductsById),
      itemsQuntJson : JSON.stringify(this.cart),
      amount : this.totalPrice,
      user_id : this.login_Id,
      address : JSON.stringify(this.radioAddData),
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

  back(){
    this.router.navigate(['/cart'])
    .then(() => {
      window.location.reload();
    });
  }

}
