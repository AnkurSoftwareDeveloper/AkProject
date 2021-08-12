import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyServiceService } from '../services/my-service.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  search: any;
  cart: {};
  envURL: any;
  searchResult: any[];
  
  constructor(private myservice: MyServiceService, private route : ActivatedRoute) { 
    this.envURL =environment.baseURL;
    
    this.route.params.subscribe(params => {
      this.search = params['search'];
        console.log(this.search); // you should have your id here.
        // this.ngOnInit();
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

    let searchWord={
      search: this.search
    }

    this.myservice.getSearch(searchWord).subscribe((data: any[])=>{
      console.log("getSearch", data);
      this.searchResult= data;
    })  
  }

  ConvertToJSON(prod: any) {
  //  console.log("ConvertToJSON", prod);
    var data = [];
    data.push(prod);
    //console.log(data);
    return data;
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
