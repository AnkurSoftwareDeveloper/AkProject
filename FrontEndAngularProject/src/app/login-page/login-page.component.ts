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
  error = '';
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
    username: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    email: ['', Validators.required]
  });

  this.loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

   // reset login status
   this.authenticationService.logout();

   // get return url from route parameters or default to '/'
   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);
    // this.http.post(environment.baseURL + '/api/accounts/register/', this.profileForm.value).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error));

      this.myservice.addUser(this.profileForm.value).subscribe((data: any[])=>{
        console.log("addUser", data);
        this.router.navigate(['/loginPage']).then(() => {
          window. location. reload();
          });
        alert("You are successfully Register please login");
      })  

  }

  onLoginSubmit(){
    console.log(this.loginForm.value);
    // this.http.post(environment.baseURL + 'api/accounts/token/', this.loginForm.value).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error));

    this.authenticationService.login(this.f.username.value, this.f.password.value)
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
            this.error = error.error.detail;
            // this.loading = false;
        });
  }

 

}
