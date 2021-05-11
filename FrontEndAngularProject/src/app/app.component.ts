import { Component } from '@angular/core';
import { MyServiceService } from './services/my-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todaydate;
  constructor(private myservice: MyServiceService) {
    console.log('It works here');
   }
  
  ngOnInit(){
    this.todaydate = this.myservice.showTodayDate();
  }

}
