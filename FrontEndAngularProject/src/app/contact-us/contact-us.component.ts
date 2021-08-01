import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyServiceService } from '../services/my-service.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  Error: any;
  contactForm: FormGroup;

  constructor(private myservice: MyServiceService, private formBuilder: FormBuilder,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      subject: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      message: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(200)]]
    });

    this.contactForm.valueChanges.subscribe(res => {
      this.Error='';
     })
  }

  get f() { return this.contactForm.controls; }

  contactValidation(){
    if(this.f.fullname.hasError('required')){
      this.Error = "fullname required";
      return
    }
    if(this.f.fullname.hasError('minlength') || this.f.fullname.hasError('maxlength')){
      this.Error = "Your fullname must contain between 3 to 50 characters.";
      return
    }
    if(this.f.email.hasError('required')){
      this.Error = "email required";
      return
    }
    if(this.f.email.hasError('pattern')){
      this.Error = "Invalid Email";
      return
    }
    if(this.f.phone.hasError('required')){
      this.Error = "phone number required";
      return
    }
    if(this.f.phone.hasError('pattern')){
      this.Error = "Invalid phone number";
      return
    }
    if(this.f.subject.hasError('required')){
      this.Error = "subject required";
      return
    }
    if(this.f.subject.hasError('minlength') || this.f.subject.hasError('maxlength')){
      this.Error = "Your subject must contain between 3 to 50 characters.";
      return
    }
    if(this.f.message.hasError('required')){
      this.Error = "message required";
      return
    }
    if(this.f.message.hasError('minlength') || this.f.message.hasError('maxlength')){
      this.Error = "Your message must contain between 3 to 200 characters.";
      return
    }

    if(this.contactForm.valid)
    {
      this.onSubmit();
    }
  }

  onSubmit(){
    console.log(this.contactForm.value);

    this.myservice.addContact(this.contactForm.value).subscribe((data: any[])=>{
      console.log("addContact", data);
      this.router.navigate(['/']).then(() => {
        window. location. reload();
        });
      alert("Your contact form submitted successfully");
    },error => {
      console.log('oops', error);
      if(error.error.username)
      this.Error = error.error.username;
      if(error.error.password)
      this.Error = error.error.password;
      if(error.error.email)
      this.Error = error.error.email;
      if(error.error.non_field_errors)
      this.Error = error.error.non_field_errors;
    })  
  }

}
