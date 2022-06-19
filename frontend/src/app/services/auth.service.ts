import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';

import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8000/auth/';

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  username!: Pick<User, 'username'>;

  httpOptions: {
    headers: HttpHeaders;
  } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {
    if(localStorage.getItem("token")){
      this.isUserLoggedIn$.next(true);
    }
  }

  signup(user: Omit<User, 'id'>): Observable<User> {
    return this.http
      .post<User>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>('signup'))
      );
  }

  login(
    email: Pick<User, 'email'>,
    password: Pick<User, 'password'>
  ): Observable<{
    token: string;
    username: Pick<User, 'username'>;
  }> {
    return this.http
      .post(
        `${this.url}/login`,
        { usernameOrEmail: email, password },
        this.httpOptions
      )
      .pipe(
        first(),
        tap((tokenObject: any) => {
          this.username = tokenObject.username;
          localStorage.setItem('token', tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(['store']);
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            username: Pick<User, 'username'>;
          }>('login')
        )
      );
  }
}
