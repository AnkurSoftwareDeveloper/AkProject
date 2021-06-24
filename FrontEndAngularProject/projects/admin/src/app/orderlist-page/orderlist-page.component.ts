import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyServiceService } from 'projects/admin/src/app/services/my-service.service';

@Component({
  selector: 'app-orderlist-page',
  templateUrl: './orderlist-page.component.html',
  styleUrls: ['./orderlist-page.component.css']
})
export class OrderlistPageComponent implements OnInit {
  allOrder: any[];
  trackAllItem: any[];
  allAddress: any[];
  allUser: any[];

  constructor(private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.myservice.getAllOrder().subscribe((data: any[])=>{
      this.allOrder = data;
      console.log(this.allOrder);
    })  
    this.myservice.getOrderDetails().subscribe((data: any[])=>{
      this.trackAllItem = data;
      console.log(this.trackAllItem);
    })  
    this.myservice.getAllAddress().subscribe((data: any[])=>{
      this.allAddress = data;
      console.log(this.allAddress);
    })  
    this.myservice.getAllUser().subscribe((data: any[])=>{
      this.allUser = data;
      console.log(this.allUser);
    })  
  }

  userDetail(userid: any){
    for (var data of this.allUser) {
      if(data.id==userid){
        return data
      }
    }
  }

  addressDetail(addid: any){
    for (var data of this.allAddress) {
      if(data.address_id==addid){
        return data
      }
    }
  }

  checkstatus(ordId: any){
    let status
    for (var data of this.trackAllItem) {
      if(data.order_id==ordId){
        if(data.status=="Your order has been placed")
         return 1;
        if(data.status=="Your order has been canceled")
        return 2;
        if(data.status=="Your order has been delivered")
        return 3;
        else
        return 1;
      }
    }
  }

}
