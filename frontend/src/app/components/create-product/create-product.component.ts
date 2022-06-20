import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { StoreComponent } from '../store/store.component';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  categories$!: Observable<Category[]>;
  productForm!: FormGroup;
  msgStr!: string;
  errorStr!: string;
  fileToUpload: File | null = null;

  constructor(
    private storeComponent: StoreComponent,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.fetchAll();
    this.productForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      price: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }

  closeProductModal() {
    this.storeComponent.closeProductModal();
  }

  addProduct(event: any): void {
    this.uploadFileToActivity();
    this.productService.create({...this.productForm.value, image: this.fileToUpload?.name ?? null}).subscribe((msg) => {
      if (Object(msg).error) {
        this.errorStr = Object(msg).error;
        this.msgStr = '';
      } else if (Object(msg).message) {
        this.msgStr = Object(msg).message;
        this.errorStr = '';
      }
    });
    window.location.reload();
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  uploadFileToActivity() {
    return this.productService.uploadImage(this.fileToUpload).subscribe();
  }
}
