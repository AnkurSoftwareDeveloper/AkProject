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
  constructor(private myservice: MyServiceService, private http: HttpClient,private formBuilder: FormBuilder,
    private router: Router) {
      this.login_Id=(JSON.parse(localStorage.getItem('currentUser'))).user_id;
     }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      old_password: ['', Validators.required],
      new_password1: ['', Validators.required],
      new_password2: ['', Validators.required]
    });
  }

  changePassword(){
    console.log(this.changePasswordForm.value);

    this.myservice.changePassword(this.changePasswordForm.value).subscribe((data: any[])=>{
      console.log("changePassword", data);
      // this.router.navigate(['/']).then(() => {
      //   window. location. reload();
      //   });
      alert("You are successfully Register please login");
    })  
  }

}
