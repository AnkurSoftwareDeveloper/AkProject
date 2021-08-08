import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyServiceService } from 'projects/admin/src/app/services/my-service.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {
  contact: any[];

  constructor(private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.myservice.getContact().subscribe((data: any[])=>{
      this.contact = data;
      console.log(this.contact);
    })  
  }

  delcont(id: any){
    var result = confirm("Want to delete?");
    if (result) {       
      this.myservice.deleteContact(id).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)); 
        alert('Deleted');
        window. location. reload();
    } 
  }

}
