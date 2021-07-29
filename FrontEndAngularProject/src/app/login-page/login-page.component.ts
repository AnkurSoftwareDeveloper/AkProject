import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MyServiceService } from '../services/my-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  returnUrl: string;
  loginError: any;
  profileError: any;
  loginForm: FormGroup;
  profileForm: FormGroup;
  envURL: any;

  constructor(private myservice: MyServiceService, private formBuilder: FormBuilder,private http: HttpClient,private authenticationService: AuthService,private route: ActivatedRoute,
    private router: Router) {
      this.envURL =environment.baseURL;
     }

ngOnInit(){
  $('.toggle').click(function(){
    // Switches the Icon
    $(this).children('i').toggleClass('fa-pencil');
    // Switches the forms  
    $('.form').animate({
    height: "toggle",
    'padding-top': 'toggle',
    'padding-bottom': 'toggle',
    opacity: "toggle"
    }, "slow");
  });

  this.profileForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    password: ['', [Validators.required,Validators.minLength(8),Validators.maxLength(150)]],
    password2: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
  });
  

  this.loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

   // reset login status
   this.authenticationService.logout();

   // get return url from route parameters or default to '/'
   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

   this.profileForm.valueChanges.subscribe(res => {
    // console.log("You entered a value");
    this.profileError='';
    // Here I want to show a message ("A field has been touched") when any field of the form gets touched
   })
   this.loginForm.valueChanges.subscribe(res => {
    this.loginError='';
   })
}

  // convenience getter for easy access to form fields
  get flogin() { return this.loginForm.controls; }
  get fprofile() { return this.profileForm.controls; }

  profileValidation(){
    if(this.fprofile.username.hasError('required')){
      this.profileError = "username required";
      return
    }
    if(this.fprofile.username.hasError('minlength') || this.fprofile.username.hasError('maxlength')){
      this.profileError = "Your username must contain between 3 to 150 characters.";
      return
    }
    if(this.fprofile.password.hasError('required')){
      this.profileError = "password required";
      return
    }
    if(this.fprofile.password.hasError('minlength') || this.fprofile.password.hasError('maxlength')){
      this.profileError = "Your password must contain at least 8 characters.";
      return
    }
    if(this.fprofile.password2.hasError('required')){
      this.profileError = "confirm password required";
      return
    }
    if(this.fprofile.password.value!=this.fprofile.password2.value){
      this.profileError = "password not matched";
      return
    }
    if(this.fprofile.email.hasError('required')){
      this.profileError = "email required";
      return
    }
    if(this.fprofile.email.hasError('pattern')){
      this.profileError = "Invalid Email";
      return
    }

    if(this.profileForm.valid)
    {
      this.onSubmit();
    }
  }

  loginValidation(){
    if(this.flogin.username.hasError('required')){
      this.loginError = "username / email required";
      return
    }
    if(this.flogin.password.hasError('required')){
      this.loginError = "password required";
      return
    }

    if(this.loginForm.valid)
    {
      this.onLoginSubmit();
    }
  }

  onSubmit() {
    console.log(this.profileForm.value);

      this.myservice.addUser(this.profileForm.value).subscribe((data: any[])=>{
        console.log("addUser", data);
        this.router.navigate(['/loginPage']).then(() => {
          window. location. reload();
          });
        alert("You are successfully Register please login");
      },error => {
        console.log('oops', error);
        if(error.error.username)
        this.profileError = error.error.username;
        if(error.error.password)
        this.profileError = error.error.password;
        if(error.error.email)
        this.profileError = error.error.email;
        if(error.error.non_field_errors)
        this.profileError = error.error.non_field_errors;
      })  

  }

  onLoginSubmit(){
    console.log(this.loginForm.value);
    this.authenticationService.login(this.flogin.username.value, this.flogin.password.value)
    .pipe(first())
    .subscribe(
        data => {
          console.log(data);
            this.router.navigate([this.returnUrl]).then(() => {
              window. location. reload();
              });
        },
        error => {
          console.log(error);
            this.loginError = error.error.detail;
            // this.loading = false;
        });
  }

 

}
