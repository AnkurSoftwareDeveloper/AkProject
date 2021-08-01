import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MyServiceService } from './services/my-service.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
  currentUser: User;
  login_name: any;

  constructor(private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute,
    private authenticationService: AuthService, private router: Router,) {

      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      if(this.currentUser){
        let login_credential = JSON.parse(localStorage.getItem('currentUser'));
        this.login_name=login_credential.username;
        console.log(this.login_name);
      }
    
   }
  
   ngOnInit(): void {
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
