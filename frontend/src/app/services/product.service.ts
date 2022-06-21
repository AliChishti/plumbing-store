import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';

import { User } from '../models/User';
import { Product } from '../models/Product';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private url = 'http://localhost:8000/product/';

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

  fetchAll(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Product[]>(
            'fetchAllProducts',
            []
          )
        )
      );
  }

  delete(id: number) {
    return this.http
      .delete(this.url + id)
      .pipe(
        catchError(
          this.errorHandlerService.handleError('deleteProduct', undefined)
        )
      );
  }

  create(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http
      .post<Product>(`${this.url}`, product, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Product>('signup'))
      );
  }

  uploadImage(image: any) {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    console.log(formData.get("image"));
    return this.http
      .post(this.url + 'upload-image', formData)
      .pipe(
        catchError(this.errorHandlerService.handleError('uploadImage', []))
      );
  }
}
