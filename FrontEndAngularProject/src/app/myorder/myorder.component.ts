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
