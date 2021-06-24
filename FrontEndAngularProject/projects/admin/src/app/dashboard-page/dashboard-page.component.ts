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
  allAddress: any[];

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

  ngAfterViewInit(){
    setTimeout(() => {
      for (var data of this.allOrder) {
        if(this.checkstatus(data.order_id)!==2 && this.checkstatus(data.order_id)!==3)
        {
          this.pendingOrder.push(data);
        }
      }
      console.log("pendingOrder",this.pendingOrder);
  }, 500);
  }

}
