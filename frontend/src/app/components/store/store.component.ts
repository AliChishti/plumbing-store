import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';

import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  products$!: Observable<Product[]>;
  isAdmin$!: boolean;
  openAddProductModal!: boolean;
  isCategoryModalOpen$!: boolean;
  isProductModalOpen$!: boolean;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin$ = localStorage.getItem('user') === '"admin"';
    this.isCategoryModalOpen$ = false;
    this.products$ = this.fetchAll();
  }

  fetchAll(): Observable<Product[]> {
    return this.productService.fetchAll();
  }

  delete(id: number){
    this.productService.delete(id).subscribe();
    window.location.reload();
  }

  openCategoryModal() {
    this.isCategoryModalOpen$ = true;
  }
  closeCategoryModal() {
    this.isCategoryModalOpen$ = false;
  }

  openProductModal() {
    this.isProductModalOpen$ = true;
  }
  closeProductModal() {
    this.isProductModalOpen$ = false;
  }

  addToCart(product:number){
    this.cartService.update(product).subscribe();
  }
}
