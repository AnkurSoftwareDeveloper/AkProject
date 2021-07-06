import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyServiceService } from 'projects/admin/src/app/services/my-service.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  allOrder: any[];
  trackAllItem: any[];
  pendingOrder: any=[];
  allUser: any;
  userLen: number;
  allOrderLen: number;
  pendingOrderLen: number;
  addressDet: any;

  constructor(private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.myservice.getAllOrder().subscribe((data: any[])=>{
      this.allOrder = data;
      this.allOrderLen = data.length;
      console.log(this.allOrder);

      this.myservice.getOrderDetails().subscribe((data: any[])=>{
        this.trackAllItem = data;
        console.log(this.trackAllItem);

        for (let data of this.allOrder) {
          if(this.checkstatus(data.order_id)!==2 && this.checkstatus(data.order_id)!==3)
          {
            this.pendingOrder.push(data);
            this.pendingOrderLen=this.pendingOrderLen+1;
          }
        }
        console.log("pendingOrder",this.pendingOrder);
      })  
    })  
    
    this.myservice.getAllUser().subscribe((data: any[])=>{
      this.allUser = data;
      this.userLen=data.length;
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
  
  addressDetail(address: any){
    this.addressDet=JSON.parse(address);
    return this.addressDet;
  }

  checkstatus(ordId: any){
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
