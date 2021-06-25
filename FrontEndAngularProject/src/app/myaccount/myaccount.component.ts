import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyServiceService } from '../services/my-service.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  login_Id: any;
  pincode: any[];
  userAddress: any;
  addressForm: FormGroup;
  editAddressForm: FormGroup;
  editProfileForm: FormGroup;
  expanded: boolean;
  editExpanded: any;
  getUserById: any;
  toggleButton: boolean = true;

  constructor(private formBuilder: FormBuilder, private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute,
    private router: Router) { 
      this.login_Id=(JSON.parse(localStorage.getItem('currentUser'))).user_id;
    }

  ngOnInit(): void {
    this.expanded = false
    
    this.myservice.getpinCode().subscribe((data: any[])=>{
      this.pincode = data;
      console.log("getpinCode", this.pincode);
    })  
    const loginId={
      "user_id": this.login_Id
    }
    console.log(loginId);

    this.myservice.getAddressByUser(loginId).subscribe((data)=>{
      this.userAddress= data;
      console.log("userAddress", this.userAddress);
      })  

      this.myservice.getUserById(this.login_Id).subscribe((data)=>{
        this.getUserById = data;
        console.log("getUserById", this.getUserById);
      })  

      this.addressForm = this.formBuilder.group({
        user_id: ['', Validators.required],
        name: ['', Validators.required],
        address: ['', Validators.required],
        address2: ['', Validators.required],
        pin_code: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        phone: ['', Validators.required],
      });

      this.editAddressForm = this.formBuilder.group({
        user_id: ['', Validators.required],
        name: ['', Validators.required],
        address: ['', Validators.required],
        pin_code: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        phone: ['', Validators.required],
      });

      this.editProfileForm = this.formBuilder.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
      });
  }

  editProfileSubmit(){
    this.myservice.updateProfile(this.editProfileForm.value,this.login_Id).subscribe((data: any[])=>{
      console.log("updateProfile", data);
        window. location. reload();
    })  
  }

  editAddress(addid: any){
    this.editExpanded=addid;
  }
  delAddress(addid: any){
    var result = confirm("Want to delete?");
    if (result) {       
      this.myservice.deleteAddress(addid).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)); 
      alert('Deleted');
      window. location. reload();
    } else {
      alert('Not deleted');
    }
  }

  editAddressSubmit(addid: any){
    this.editAddressForm.controls['city'].setValue("Patna");
    this.editAddressForm.controls['state'].setValue("Bihar");
    this.editAddressForm.controls['user_id'].setValue(this.login_Id);

    console.log(this.editAddressForm.value);

    this.myservice.updateAddress(this.editAddressForm.value,addid).subscribe((data: any[])=>{
      console.log("editAddressForm", data);
        window. location. reload();
    })  
  }

  pin(pinid: any){
    for (var item of this.pincode) {
        if(item.pinCode_id==pinid)
          return item.pin_code
    }
  }

  get f() { return this.addressForm.controls; }

  addressSubmit(){
    this.addressForm.controls['city'].setValue("Patna");
    this.addressForm.controls['state'].setValue("Bihar");
    this.addressForm.controls['address'].setValue(this.f.address.value +" "+ this.f.address2.value);
    this.addressForm.controls['user_id'].setValue(this.login_Id);

    console.log(this.addressForm.value);

    this.myservice.addAddress(this.addressForm.value).subscribe((data: any[])=>{
      console.log("addressForm", data);
        window. location. reload();
    })  
  }

}
