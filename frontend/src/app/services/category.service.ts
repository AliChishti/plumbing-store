import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { first, catchError, tap } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';

import { Category } from '../models/Category';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = 'http://localhost:8000/category/';

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

  fetchAll(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Category[]>(
            'fetchAllCategory',
            []
          )
        )
      );
  }

  create(category: Omit<Category, 'id'>): Observable<Category> {
    return this.http
      .post<Category>(`${this.url}`, category, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Category>('createCategory'))
      );
  }
}
