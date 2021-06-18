import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MyServiceService } from '../services/my-service.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  login_Id: any;

  constructor(private myservice: MyServiceService, private http: HttpClient,private formBuilder: FormBuilder,
    private router: Router) {
      this.login_Id=(JSON.parse(localStorage.getItem('currentUser'))).user_id;
     }

  ngOnInit(): void {

  }

  changePassword(){
    const pass={
        "old_password": "Old@123",
        "new_password": "New@123"
    }
    this.myservice.changePassword(pass).subscribe((data: any[])=>{
      console.log("changePassword", data);
      // this.router.navigate(['/']).then(() => {
      //   window. location. reload();
      //   });
      alert("You are successfully Register please login");
    })  
  }

}
