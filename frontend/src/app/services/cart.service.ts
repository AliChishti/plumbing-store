import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';

import { User } from '../models/User';
import { Product } from '../models/Product';
import { Cart } from '../models/Cart';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url = 'http://localhost:8000/cart/';

  httpOptions: {
    headers: HttpHeaders;
  } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  get(): Observable<Cart> {
    return this.http
      .get<Cart>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Cart>('getCart', undefined)
        )
      );
  }

  update(product: number) {
    return this.http
      .patch(`${this.url}`, { product: product }, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError('updateCart'))
      );
  }

  increaseQuantity(product: number) {
    return this.http
      .patch(`${this.url}increase`, { product: product }, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError('updateCart'))
      );
  }

  decreaseQuantity(product: number) {
    return this.http
      .patch(`${this.url}decrease`, { product: product }, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError('updateCart'))
      );
  }

  removeItem(product: number) {
    return this.http
      .patch(`${this.url}remove`, { product: product }, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError('updateCart'))
      );
  }
}
