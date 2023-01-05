import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';


import { StoreComponent } from '../store/store.component';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  msgStr!: string;
  errorStr!: string;

  constructor(private storeComponent: StoreComponent, private categoryService: CategoryService,) { }

  ngOnInit(): void {
    this.categoryForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  closeCategoryModal() {
    this.storeComponent.closeCategoryModal();
  }

  addCategory(): void {
    this.categoryService.create(this.categoryForm.value).subscribe((msg) => {
      if(Object(msg).error){
        this.errorStr = Object(msg).error;
        this.msgStr = "";
      }
      else if (Object(msg).message){
        this.msgStr = Object(msg).message;
        this.errorStr = "";
      }
    });
  }
}
