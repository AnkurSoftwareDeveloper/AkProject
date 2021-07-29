import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyServiceService } from '../services/my-service.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  login_Id: any;
  changePasswordForm: FormGroup;
  Error: string;

  constructor(private myservice: MyServiceService, private http: HttpClient,private formBuilder: FormBuilder,
    private router: Router) {
      this.login_Id=(JSON.parse(localStorage.getItem('currentUser'))).user_id;
     }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      old_password: ['', [Validators.required]],
      new_password1: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(150)]],
      new_password2: ['', [Validators.required]]
    });

    this.changePasswordForm.valueChanges.subscribe(res => {
      this.Error='';
     })
  }

  get f() { return this.changePasswordForm.controls; }

  changePassValidation(){
    if(this.f.old_password.hasError('required')){
      this.Error = "current password required";
      return
    }
    if(this.f.new_password1.hasError('required')){
      this.Error = "new password required";
      return
    }
    if(this.f.new_password1.hasError('minlength') || this.f.new_password1.hasError('maxlength')){
      this.Error = "Your password must contain at least 8 characters.";
      return
    }
    if(this.f.new_password2.hasError('required')){
      this.Error = "confirm password required";
      return
    }
    if(this.f.new_password1.value!=this.f.new_password2.value){
      this.Error = "password not matched";
      return
    }

    if(this.changePasswordForm.valid)
    {
      this.changePassword();
    }
  }

  changePassword(){
    console.log(this.changePasswordForm.value);

    this.myservice.changePassword(this.changePasswordForm.value).subscribe((data: any[])=>{
      console.log("changePassword", data);
      this.router.navigate(['/']).then(() => {
        window. location. reload();
        });
      alert("You password changed successfully");
    },error => {
      console.log('oops', error);
      if(error.error.old_password)
      this.Error = error.error.old_password;
      if(error.error.new_password1)
      this.Error = error.error.new_password1;
      if(error.error.new_password2)
      this.Error = error.error.new_password2;
      if(error.error.non_field_errors)
      this.Error = error.error.non_field_errors;
    })   
  }

}
