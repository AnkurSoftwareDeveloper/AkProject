import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  constructor(private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute,
    private router: Router) { 

      this.cart = JSON.parse(localStorage.getItem('cart'));
    }

  ngOnInit(): void {
    for (var item in this.cart) {
      console.log("cartitem", item);
      this.myservice.getProductsById(item).subscribe((data)=>{
      this.getProductsById.push(data);
      console.log("getProductsById", this.getProductsById);
      })  
    }

  }

}
