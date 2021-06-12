import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'projects/admin/src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  returnUrl: string;
  error = '';
  adminloginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private authenticationService: AuthService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    this.adminloginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  
     // reset login status
     this.authenticationService.logout();
  
     // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.adminloginForm.controls; }
  
  onLoginSubmit(){
    console.log(this.adminloginForm.value);
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
