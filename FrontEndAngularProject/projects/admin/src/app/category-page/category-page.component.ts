import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyServiceService } from 'projects/admin/src/app/services/my-service.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  category: any[];
  categoryForm: FormGroup;
  isAddMode: boolean;

  constructor(private formBuilder: FormBuilder,private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.myservice.getCategory().subscribe((data: any[])=>{
      this.category = data;
      console.log("allcategory", this.category);
    })  

    this.categoryForm = this.formBuilder.group({
      category_name: ['', Validators.required],

    });
  }

  onSubmit(){
      if (!this.isAddMode) {
          this.createCategory();
      } else {
          this.updateCategory();
      }
  }

  createCategory(){
      alert('create'+this.isAddMode);
      console.log(this.categoryForm.value);

      this.myservice.addCategory(this.categoryForm.value).subscribe(
        (response) => console.log(response),
        (error) => console.log(error));

      this.categoryForm.reset();
  }
  updateCategory(){
    alert('update'+this.isAddMode);
    console.log(this.categoryForm.value);

    this.myservice.updateCategory(this.isAddMode, this.categoryForm.value).subscribe(
      (response) => console.log(response),
      (error) => console.log(error));

    this.isAddMode=undefined;
    this.categoryForm.reset();
  }

  getCategoryName(id: any){
    for (var data of this.category) {
      if(data.category_id==id)
         return data.category_name;
    }
  }

  editCategory(id: any){
    this.isAddMode = id;
    let items;
    for (var data of this.category) {
      if(data.category_id==id)
        items= data;
    }
    this.categoryForm.setValue({
      category_name: items.category_name,
    });
  }

  delCategory(id: any){
    var result = confirm("Want to delete?");
    if (result) {       
      this.myservice.deleteCategory(id).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)); 
      alert('Deleted');
    } else {
      alert('Not deleted');
    }
  }

}
