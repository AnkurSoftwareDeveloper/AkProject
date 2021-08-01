import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyServiceService } from '../services/my-service.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart: {};
  getProductsById:any = [];
  totalPrice:number= 0;
  envURL: any;
  cartItem: any;

  constructor(private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute,
    private router: Router) {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.envURL =environment.baseURL;
    
   }

  ngOnInit(): void {
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

      
  }

  ngAfterContentChecked(){
    this.calculateTotal();
  }

  calculate(price:any,qunt:any){
    return price*qunt;
  }

  calculateTotal(){
    this.totalPrice=0;
    for (var i = 0; i < this.getProductsById.length; i++) {
      if (this.getProductsById[i].discount_price) {
        this.totalPrice += this.getProductsById[i].discount_price * this.cart[this.getProductsById[i].product_id];
      }
    }
  }

  continueShopping(){
    this.router.navigate([''])
    .then(() => {
      window.location.reload();
    });
  }

  Checkout(){
    console.log(this.cart)
    if(Object.keys(this.cart).length != 0){
      this.router.navigate(['/checkOut']);
    }
    else{
      alert("Your cart is empty");
    }
    
  }

  removeCartItem(cartId:any){
    console.log(cartId);
    delete this.cart[cartId];
    localStorage.setItem('cart', JSON.stringify(this.cart));
    window.location.reload();
    console.log(this.cart);
    
  }

  clearCart() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    // localStorage.clear();
    this.cart = {};
    localStorage.setItem('cart', JSON.stringify(this.cart));
    window.location.reload();
  }

  updateCart(cart) {
    console.log(cart);
    for (var item in this.cart) {
      console.log("cartitem", item);
      if(cart[item]==null)
      {
        delete this.cart[item];
        window.location.reload();
      }
    }
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
}

minusCart(cartId:any){
  console.log('minusCart',cartId);
  var idstr= cartId.toString();
  this.cart[idstr] = this.cart[idstr] - 1;
  this.cart[idstr] = Math.max(0, this.cart[idstr]);
  if(this.cart[idstr]==0)
  {
    delete this.cart[cartId];
    localStorage.setItem('cart', JSON.stringify(this.cart));
    window.location.reload();
  }  
  this.updateCart(this.cart);
}

plusCart(cartId:any){
  console.log('plusCart',cartId);
  var idstr= cartId.toString();
  this.cart[idstr] = this.cart[idstr] + 1;
  this.cart[idstr] = Math.max(0, this.cart[idstr]);
  this.updateCart(this.cart);
}

}
