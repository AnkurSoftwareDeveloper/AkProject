import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyServiceService } from '../services/my-service.service';

@Component({
  selector: 'app-orderdetails-page',
  templateUrl: './orderdetails-page.component.html',
  styleUrls: ['./orderdetails-page.component.css']
})
export class OrderdetailsPageComponent implements OnInit {
  orderId: any;
  getOrdersById: any;
  orderItem: any;
  orderItemQunt: any;

  constructor(private myservice: MyServiceService, private route : ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.orderId = params['ord'];
        console.log(this.orderId); 
      });
   }

  ngOnInit(): void {
    this.myservice.getMyOrdertById(this.orderId).subscribe((data)=>{
      this.getOrdersById = data;
      this.orderItem=JSON.parse(this.getOrdersById.itemsJson);
      console.log("getMyOrdertById", this.getOrdersById, this.orderItem);
    })  

  }

  convertQuntJson(orderQuntJson: any,proId: any){
    this.orderItemQunt=JSON.parse(orderQuntJson)
    for (let [key, value] of Object.entries(this.orderItemQunt)) {
      if(key==proId){
        return value
      }
    }
  }

}
