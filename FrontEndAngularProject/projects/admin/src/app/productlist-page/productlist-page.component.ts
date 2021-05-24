import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyServiceService } from 'src/app/services/my-service.service';

@Component({
  selector: 'app-productlist-page',
  templateUrl: './productlist-page.component.html',
  styleUrls: ['./productlist-page.component.css']
})
export class ProductlistPageComponent implements OnInit {

  products: any[];
  constructor(private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.myservice.getProducts().subscribe((data: any[])=>{
      this.products = data;
      console.log(this.products);
    })  
  }

  ConvertToJSON(prod: any) {
    //  console.log("ConvertToJSON", prod);
      var data = [];
      data.push(prod);
      //console.log(data);
      return data;
    }

}
