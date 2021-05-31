import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyServiceService } from 'projects/admin/src/app/services/my-service.service';

@Component({
  selector: 'app-subcategory-page',
  templateUrl: './subcategory-page.component.html',
  styleUrls: ['./subcategory-page.component.css']
})
export class SubcategoryPageComponent implements OnInit {

  category: any[];
  subCategory: any[];
  subCategoryForm: FormGroup;
  isAddMode: boolean;

  constructor(private formBuilder: FormBuilder,private myservice: MyServiceService,private http: HttpClient,private route : ActivatedRoute) {
    
   
  }

  ngOnInit(): void {
    this.myservice.getSubCategory().subscribe((data: any[])=>{
      this.subCategory = data;
      console.log("allsubcategory", this.subCategory);
    })  

    this.myservice.getCategory().subscribe((data: any[])=>{
      this.category = data;
      console.log("allcategory", this.category);
    })  

    this.subCategoryForm = this.formBuilder.group({

      category_id: ['', Validators.required],
      subCategory_name: ['', Validators.required],

    });
  }

  onSubmit(){
      if (!this.isAddMode) {
          this.createSubCategory();
      } else {
          this.updateSubCategory();
      }
  }

  createSubCategory(){
      alert('create'+this.isAddMode);
      console.log(this.subCategoryForm.value);

      this.myservice.addSubCategory(this.subCategoryForm.value).subscribe(
        (response) => console.log(response),
        (error) => console.log(error));

      this.subCategoryForm.reset();
  }
  updateSubCategory(){
    alert('update'+this.isAddMode);
    console.log(this.subCategoryForm.value);

    this.myservice.updateSubCategory(this.isAddMode, this.subCategoryForm.value).subscribe(
      (response) => console.log(response),
      (error) => console.log(error));

    this.isAddMode=undefined;
    this.subCategoryForm.reset();
  }

  getCategoryName(id: any){
    for (var data of this.category) {
      if(data.category_id==id)
         return data.category_name;
    }
  }

  editSubCategory(id: any){
    this.isAddMode = id;
    let items;
    for (var data of this.subCategory) {
      if(data.subCategory_id==id)
        items= data;
    }
    this.subCategoryForm.setValue({

      category_id: items.category_id,
      subCategory_name: items.subCategory_name,
    });
  }

  delSubCategory(id: any){
    var result = confirm("Want to delete?");
    if (result) {       
      this.myservice.deleteSubCategory(id).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)); 
      alert('Deleted');
    } else {
      alert('Not deleted');
    }
  }

}
