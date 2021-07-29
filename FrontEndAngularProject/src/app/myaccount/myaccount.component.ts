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
  addError: string;
  editAddError: string;
  nameError: string;

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
        user_id: ['', [Validators.required]],
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
        address2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
        pin_code: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
      });

      this.editAddressForm = this.formBuilder.group({
        user_id: ['', [Validators.required]],
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
        pin_code: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
      });

      this.editProfileForm = this.formBuilder.group({
        first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      });

      this.addressForm.valueChanges.subscribe(res => {
        this.addError='';
       })
       this.editAddressForm.valueChanges.subscribe(res => {
        this.editAddError='';
       })
       this.editProfileForm.valueChanges.subscribe(res => {
        this.nameError='';
       })
  }

  get fname() { return this.editProfileForm.controls; }

  nameValidation(){
    if(this.fname.first_name.hasError('required')){
      this.nameError = "first_name required";
      return
    }
    if(this.fname.first_name.hasError('minlength') || this.fname.first_name.hasError('maxlength')){
      this.nameError = "Your first_name must contain between 2 to 25 characters.";
      return
    }
    if(this.fname.last_name.hasError('required')){
      this.nameError = "last_name required";
      return
    }
    if(this.fname.last_name.hasError('minlength') || this.fname.last_name.hasError('maxlength')){
      this.nameError = "Your last_name must contain between 2 to 25 characters.";
      return
    }
    if(this.editProfileForm.valid)
    {
      this.editProfileSubmit();
    }
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

  get feditAdd() { return this.editAddressForm.controls; }

  editAddValidation(addid: any){
    if(this.feditAdd.name.hasError('required')){
      this.editAddError = "name required";
      return
    }
    if(this.feditAdd.name.hasError('minlength') || this.feditAdd.name.hasError('maxlength')){
      this.editAddError = "Your name must contain between 2 to 50 characters.";
      return
    }
    if(this.feditAdd.phone.hasError('required')){
      this.editAddError = "phone number required";
      return
    }
    if(this.feditAdd.phone.hasError('pattern')){
      this.editAddError = "Invalid phone number";
      return
    }
    if(this.feditAdd.address.hasError('required')){
      this.editAddError = "address required";
      return
    }
    if(this.feditAdd.address.hasError('minlength') || this.feditAdd.address.hasError('maxlength')){
      this.editAddError = "Your address must contain between 3 to 400 characters.";
      return
    }
    if(this.feditAdd.pin_code.hasError('required')){
      this.editAddError = "pin_code required";
      return
    }

    this.editAddressForm.controls['city'].setValue("Patna");
    this.editAddressForm.controls['state'].setValue("Bihar");
    this.editAddressForm.controls['user_id'].setValue(this.login_Id);

    if(this.editAddressForm.valid)
    {
      this.editAddressSubmit(addid);
    }
  }

  editAddressSubmit(addid: any){
   
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

  get fadd() { return this.addressForm.controls; }

  addValidation(){
    if(this.fadd.name.hasError('required')){
      this.addError = "name required";
      return
    }
    if(this.fadd.name.hasError('minlength') || this.fadd.name.hasError('maxlength')){
      this.addError = "Your name must contain between 2 to 50 characters.";
      return
    }
    if(this.fadd.phone.hasError('required')){
      this.addError = "phone number required";
      return
    }
    if(this.fadd.phone.hasError('pattern')){
      this.addError = "Invalid phone number";
      return
    }
    if(this.fadd.address.hasError('required')){
      this.addError = "address required";
      return
    }
    if(this.fadd.address.hasError('minlength') || this.fadd.address.hasError('maxlength')){
      this.addError = "Your address must contain between 3 to 200 characters.";
      return
    }
    if(this.fadd.address2.hasError('required')){
      this.addError = "address required";
      return
    }
    if(this.fadd.address2.hasError('minlength') || this.fadd.address2.hasError('maxlength')){
      this.addError = "Your address line 2 must contain between 3 to 200 characters.";
      return
    }
    if(this.fadd.pin_code.hasError('required')){
      this.addError = "pin_code required";
      return
    }

    this.addressForm.controls['city'].setValue("Patna");
    this.addressForm.controls['state'].setValue("Bihar");
    this.addressForm.controls['address'].setValue(this.fadd.address.value +" "+ this.fadd.address2.value);
    this.addressForm.controls['user_id'].setValue(this.login_Id);

    if(this.addressForm.valid)
    {
      this.addressSubmit();
    }
  }

  addressSubmit(){
   
    console.log(this.addressForm.value);

    this.myservice.addAddress(this.addressForm.value).subscribe((data: any[])=>{
      console.log("addressForm", data);
        window. location. reload();
    })  
  }

}
