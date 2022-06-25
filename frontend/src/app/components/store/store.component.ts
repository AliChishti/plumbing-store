import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';

import { Product } from 'src/app/models/Product';
import { Item } from 'src/app/models/Item';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Rating } from 'src/app/models/Ratings';
import { Feedback } from 'src/app/models/Feedback';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  feedbackForm!: FormGroup;
  feedbackProductId$!: number;
  products$!: Observable<Product[]>;
  deliveredProducts$!: Observable<number[]>;
  productIdsFeedbacked$!: Observable<number[]>;
  isAdmin$!: boolean;
  isFeedbackModalOpen$!: boolean;
  isViewFeedbackModalOpen$!: boolean;
  isCategoryModalOpen$!: boolean;
  isProductModalOpen$!: boolean;
  rating$!: number;
  productRatings$!: Observable<Rating []>;
  productFeedbacks$!: Observable<Feedback []>; 


  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private orderService: OrderService,
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin$ = localStorage.getItem('user') === '"admin"';
    this.isCategoryModalOpen$ = false;
    this.products$ = this.fetchAll();
    this.deliveredProducts$ = this.getDeliveredProducts();
    this.productIdsFeedbacked$ = this.getProductsThatwereFeedbacked();
    this.feedbackForm = this.createFormGroup();
    this.productRatings$ = this.getRatings();

    console.log(this.productRatings$.subscribe((msg)=>console.log(msg)));
  }

  getRatings() {
    return this.feedbackService.getRatings();
  }
  createFormGroup(): FormGroup {
    return new FormGroup({
      comment: new FormControl(''),
    });
  }

  getProductsThatwereFeedbacked(): any {
    return this.feedbackService.getByUser();
  }

  getDeliveredProducts(): any {
    return this.orderService.getByUserDelivered();
  }

  fetchAll(): Observable<Product[]> {
    return this.productService.fetchAll();
  }

  delete(id: number) {
    this.productService.delete(id).subscribe();
    window.location.reload();
  }

  addToCart(product: number) {
    this.cartService.update(product).subscribe();
  }

  onRatingChange(event: any) {
    this.rating$ = event.rating;
  }

  addFeedback() {
    this.feedbackService.addFeeback(
      this.rating$,
      this.feedbackForm.value.comment,
      this.feedbackProductId$
    ).subscribe();

    window.location.reload();
  }

  openCategoryModal() {
    this.isCategoryModalOpen$ = true;
  }
  closeCategoryModal() {
    this.rating$ = 0;
    this.isCategoryModalOpen$ = false;
  }

  openFeedbackModal(product: number) {
    this.isFeedbackModalOpen$ = true;
    this.feedbackProductId$ = product;
  }
  closeFeedbackModal() {
    this.isFeedbackModalOpen$ = false;
  }

  openViewFeedbackModal(product: number) {
    this.isViewFeedbackModalOpen$ = true;
    this.feedbackProductId$ = product;
    this.productFeedbacks$ = this.feedbackService.getByProduct(this.feedbackProductId$);
  }
  closeViewFeedbackModal() {
    this.isViewFeedbackModalOpen$ = false;
  }

  openProductModal() {
    this.isProductModalOpen$ = true;
  }
  closeProductModal() {
    this.isProductModalOpen$ = false;
  }
}
