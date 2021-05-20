import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyServiceService } from '../services/my-service.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {
  productId: any;
  getProductsById: any="";
  cart: {};

  constructor(private myservice: MyServiceService, private route : ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.productId = params['prod'];
        console.log(this.productId); 
     //   this.ngOnInit();
      });

      if(localStorage.getItem('cart') == null)
    {
     this.cart={};
    }
    else{
    this.cart= JSON.parse(localStorage.getItem('cart'));
    }

   }

  ngOnInit(): void {

    this.myservice.getProductsById(this.productId).subscribe((data)=>{
      this.getProductsById = data;
      console.log("getProductsById", this.getProductsById);
    })  
  }

  addCart(cartId:any) {
    console.log('working',cartId);
     var idstr= cartId.toString();
     console.log(idstr);
     if(this.cart[idstr]!= undefined) {
     this.cart[idstr] = this.cart[idstr]+1;
     }
     else{
     this.cart[idstr] = 1;
     }

     this.updateCart(this.cart);
 }

 updateCart(cart) {
   console.log(cart);
   for (var item in this.cart) {
     console.log("cartitem", item);
     if(cart[item]==null)
     {
       delete this.cart[item];
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
