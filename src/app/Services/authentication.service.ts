import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isPastorLoggedIn$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isPastorLoggedIn$ = new BehaviorSubject<boolean>(false);
   }

  setUserLoggedIn(status:boolean) {
    this.isPastorLoggedIn$.next(status);
  }

  getLoginStatus(): Observable<boolean> {
    return this.isPastorLoggedIn$;
  }
  
  logOut() {
    sessionStorage.clear();
  }

}
