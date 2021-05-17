import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isUserLoggedIn$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
   }

  setUserLoggedIn(status:boolean) {
    this.isUserLoggedIn$.next(status);
  }

  getLoginStatus(): Observable<boolean> {
    return this.isUserLoggedIn$;
  }
  
  logOut() {
    sessionStorage.clear();
  }

}
