import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyServiceService } from '../services/my-service.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  changeStatus: FormGroup;
  trackAllItem: any[];
  getAddressById: any;
  pincode: any[];

  constructor(private formBuilder: FormBuilder,private myservice: MyServiceService,private http: HttpClient,
    private route : ActivatedRoute) {
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
          this.myservice.getAddressById(this.getOrdersById.address).subscribe((data)=>{
            this.getAddressById = data;
            console.log("getAddressById", this.getAddressById);
          })  
    })  
    
    this.myservice.getOrderDetails().subscribe((data: any[])=>{
      this.trackAllItem = data;
      console.log(this.trackAllItem);
    })  

    this.myservice.getpinCode().subscribe((data: any[])=>{
      this.pincode = data;
      console.log("getpinCode", this.pincode);
    })  

    this.changeStatus = this.formBuilder.group({

      order_id: ['', Validators.required],
      user_id: ['', Validators.required],
      status: ['', Validators.required],

    });

  }

  ngAfterViewInit(){
    setTimeout(() => {

      for (var data of this.trackAllItem) {
        if(data.order_id==this.getOrdersById.order_id){
          this.changeStatus.setValue({
            status: data.status,
            order_id: this.orderId,
            user_id: this.getOrdersById.user_id,
          });
          break;
        }
        
      }
      console.log(this.changeStatus.value);
      }, 500);
  }

  pin(pinid: any){
    for (var item of this.pincode) {
        if(item.pinCode_id==pinid)
          return item.pin_code
    }
  }

  onSubmit(){
    this.changeStatus.controls['order_id'].setValue(this.orderId);
    this.changeStatus.controls['user_id'].setValue(this.getOrdersById.user_id);
    console.log(this.changeStatus.value);

    this.myservice.addOrderUpdate(this.changeStatus.value).subscribe(
      (response) => console.log(response),
      (error) => console.log(error));
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
