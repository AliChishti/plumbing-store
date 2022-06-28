import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      const loginError: HTMLElement | null =
        document.getElementById('login-error');
      if (loginError) {
        loginError.textContent = "Username, Email or Password is invalid!";
      }
      console.log(`${operation} failed: ${error.msg}`);
      return of(result as T);
    };
  }
}
