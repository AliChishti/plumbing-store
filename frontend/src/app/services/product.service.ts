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
}
