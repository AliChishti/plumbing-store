import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';
import { Card } from '../models/Card';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private cardUrl = 'http://localhost:8000/card';
  private orderUrl = 'http://localhost:8000/order';


  httpOptions: {
    headers: HttpHeaders;
  } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  saveCard(card: Omit<Card, 'user'>): Observable<Card> {
    return this.http
      .post<Card>(`${this.cardUrl}`, card, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Card>('saveCard'))
      );
  }

  getCard(): Observable<Card> {
    return this.http
      .get<Card>(`${this.cardUrl}`, { responseType: 'json' })
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Card>('getCard'))
      );
  }

  payAmount(order: Omit<Order, "id" | "user" | "status">): Observable<Order> {
    return this.http
    .post<Order>(`${this.orderUrl}`, order, this.httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handleError<Order>('payAmount'))
    );
  }
}
