import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MyServiceService } from './services/my-service.service';
import * as $ from 'jquery';
import { AuthService } from './services/auth.service';
import { User } from './_models/user';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  category: any[];
  subCategory: any[];
  cartno: number;
  currentUser: User;
  login_name: any;
  // postData = 
  // {
  //   "category_name": "Fruits & Vegetables"
  // };

  constructor(private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute,
    private authenticationService: AuthService, private router: Router,) {

      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    setInterval(() => {
      if(this.cartno==null && this.cartno==undefined){
        this.cartno=0;
      }
      else{
        this.cartno =Object.keys(JSON.parse(localStorage.getItem('cart'))).length;
        console.log(this.cartno);
      }
     },500)
    
   }
  
   ngOnInit(): void {

    this.myservice.getCategory().subscribe((data: any[])=>{
      this.category = data;
      console.log("allcategory", this.category);
    })  
    
    this.myservice.getSubCategory().subscribe((data: any[])=>{
      this.subCategory = data;
      console.log("allsubcategory", this.subCategory);
    })  

    if(this.currentUser){
      let login_credential = JSON.parse(localStorage.getItem('currentUser'));
      this.login_name=login_credential.username;
      console.log(this.login_name);
    }

    //////// scroll top////////
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  
}

logout() {
  this.authenticationService.logout();
  this.router.navigate(['/']).then(() => {
    window. location. reload();
    });
}


}
