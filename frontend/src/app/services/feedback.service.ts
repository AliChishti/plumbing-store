import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { Feedback } from '../models/Feedback';
import { ErrorHandlerService } from './error-handler.service';
import { Rating } from '../models/Ratings';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private url = 'http://localhost:8000/feedback';

  httpOptions: {
    headers: HttpHeaders;
  } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  getByUser(): Observable<Feedback[]> {
    return this.http
      .get<Feedback[]>(`${this.url}`, { responseType: 'json' })
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<Feedback[]>('getFeedbackByUser')
        )
      );
  }

  getByProduct(product:number): Observable<Feedback []> {
    return this.http
    .get<Feedback[]>(`${this.url}/${product}`, { responseType: 'json' })
    .pipe(
      first(),
      catchError(
        this.errorHandlerService.handleError<Feedback[]>('getFeedbackByUser')
      )
    );
  }

  addFeeback(
    rating: number,
    comment: string,
    product: number
  ): Observable<Feedback> {
    return this.http
      .post<Feedback>(
        `${this.url}/${product}`,
        { rating, comment },
        this.httpOptions
      )
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Feedback>('addFeeback'))
      );
  }

  getRatings(): Observable<Rating []> {
    return this.http
      .get<Rating []>(`${this.url}/rating`, { responseType: 'json' })
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Rating []>('getRatings'))
      );
  }
}
