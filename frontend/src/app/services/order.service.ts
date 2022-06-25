import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { Order } from '../models/Order';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = 'http://localhost:8000/order';

  httpOptions: {
    headers: HttpHeaders;
  } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  getByUser(): Observable<Order[]> {
    return this.http
      .get<Order[]>(`${this.url}`, { responseType: 'json' })
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<Order[]>('getOrdersByUser')
        )
      );
  }

  get(order: number): Observable<Order> {
    return this.http
      .get<Order>(`${this.url}/${order}`, { responseType: 'json' })
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Order>('getOrder'))
      );
  }

  getByUserDelivered() {
    return this.http
      .get(`${this.url}/delivered`, { responseType: 'json' })
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError('getOrdersByUserDelivered')
        )
      );
  }


  updateStatus(status: object, order: number): Observable<Order> {
    return this.http
      .patch<Order>(`${this.url}/${order}`, status, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Order>('getOrder'))
      );
  }
}
