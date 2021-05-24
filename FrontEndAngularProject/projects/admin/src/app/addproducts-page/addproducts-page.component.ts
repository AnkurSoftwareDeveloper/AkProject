import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyServiceService } from 'projects/admin/src/app/services/my-service.service';

@Component({
  selector: 'app-addproducts-page',
  templateUrl: './addproducts-page.component.html',
  styleUrls: ['./addproducts-page.component.css']
})
export class AddproductsPageComponent implements OnInit {

  constructor(private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute) { 
    
  }

  ngOnInit(): void {
  }

  profileForm = new FormGroup({
    product_name: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
  });
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);
    this.myservice.addProducts(this.profileForm).subscribe(
      (response) => console.log(response),
      (error) => console.log(error));
  }

}
