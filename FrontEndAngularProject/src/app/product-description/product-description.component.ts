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

  constructor(private myservice: MyServiceService, private route : ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.productId = params['prod'];
        console.log(this.productId); 
     //   this.ngOnInit();
      });

   }

  ngOnInit(): void {

    this.myservice.getProductsById(this.productId).subscribe((data)=>{
      this.getProductsById = data;
      console.log("getProductsById", this.getProductsById);
    })  
  }

}
