import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MyServiceService } from '../services/my-service.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  login_Id: any;
  myOrder: any;
  trackItem: any[];
  orderItem: any;
  showtracker: any;
  orderItemQunt: any;
  trackAllItem: any[];

  constructor(private myservice: MyServiceService, private http: HttpClient) {
    this.login_Id=(JSON.parse(localStorage.getItem('currentUser'))).user_id;
   }

  ngOnInit(): void {
    const loginId={
      "user_id": this.login_Id
    }
    console.log(loginId);

    this.myservice.getMyOrder(loginId).subscribe((data)=>{
      this.myOrder = data;
      console.log("getMyOrder", this.myOrder);
    })  

    this.myservice.getTrackAll(loginId).subscribe((data: any[])=>{
      this.trackAllItem = data;
      console.log("getTrackAll", this.trackAllItem);
    })  
    
  }

  convertItemsJson(orderJson: any){
    this.orderItem=JSON.parse(orderJson)
    return this.orderItem
  }
  convertQuntJson(orderQuntJson: any,proId: any){
    this.orderItemQunt=JSON.parse(orderQuntJson)
    for (let [key, value] of Object.entries(this.orderItemQunt)) {
      if(key==proId){
        return value
      }
    }
  }

  OrderTime(ordId: any){
    for (var data of this.trackAllItem) {
      if(data.order_id==ordId){
        let time=((data.time.toString().split('')).slice(0,16)).join('');
        return time
      }
    }
  }

  checkstatus(ordId: any){
    for (var data of this.trackAllItem) {
      if(data.order_id==ordId){
        if(data.status=="Your order has been placed")
         return 1;
        if(data.status=="Your order has been confirmed")
        return 2;
        if(data.status=="Your order has been shipped")
        return 3;
        if(data.status=="Your order has been canceled")
        return 4;
        if(data.status=="Your order has been delivered")
        return 5;
      }
    }
  }

  cancelorder(ordId: any){
    if(this.checkstatus(ordId)<=2){
        var result = confirm("Want to cancel your order?");
        if (result) {       
          const changeStatus={
            status: "Your order has been canceled",
            order_id: ordId,
            user_id: this.login_Id,
          }
          this.myservice.addOrderUpdate(changeStatus).subscribe(
            (response) => console.log(response),
            (error) => console.log(error));
            window.location.reload();
        } else {
          alert('Not canceled');
        }
  }else{
    alert('Your order is shipped');
  }
    
  }

  trackorder(ordId: any){

    this.showtracker=ordId;

    const trackId={
      "orderId":ordId,
      "user_id": this.login_Id
    }
    this.myservice.getTracker(trackId).subscribe((data: any[])=>{
      this.trackItem = data;
      console.log("getTracker", this.trackItem);
    })  
  }

}
