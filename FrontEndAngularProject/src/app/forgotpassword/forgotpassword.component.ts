import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyServiceService } from '../services/my-service.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;

  constructor(private myservice: MyServiceService, private http: HttpClient,private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  forgotPassword(){
    console.log(this.forgotPasswordForm.value);

    this.myservice.forgetPassword(this.forgotPasswordForm.value).subscribe((data: any[])=>{
      console.log("changePassword", data);
      // this.router.navigate(['/']).then(() => {
      //   window. location. reload();
      //   });
      alert("send you a temporary link in email");
    })  
  }
}
