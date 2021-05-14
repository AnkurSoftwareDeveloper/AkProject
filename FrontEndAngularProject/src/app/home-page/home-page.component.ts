import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { MyServiceService } from '../services/my-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  category: any[];
  subCategory: any[];

  constructor(private myservice: MyServiceService) { }

  ngOnInit(): void { 

    this.myservice.getCategory().subscribe((data: any[])=>{
      this.category = data;
      console.log("allcategory", this.category);
    })  
    
    this.myservice.getSubCategory().subscribe((data: any[])=>{
      this.subCategory = data;
      console.log("allsubcategory", this.subCategory);
    })  

    
  }

}
