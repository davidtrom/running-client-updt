import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl=environment.baseUrl;
  private isUserLoggedIn$: BehaviorSubject<boolean>;
  private loginUrl: string = this.baseUrl + "/authenticate";

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

  verifyUser(username:string, password:string){
    return this.http.post<any>(this.loginUrl, {username, password})
      .pipe(map(userData => {
        console.log("verifying ");
        sessionStorage.setItem('username', username);
        // console.log("authentication service jwt: " + userData.jwt);
        sessionStorage.setItem("token", userData.jwt);
        // console.log("Token: " + sessionStorage.getItem('token'));
        if((sessionStorage.getItem("username") != null) && (sessionStorage.getItem("token") != null)){
          this.setUserLoggedIn(true);
        }
        console.log("Pastor Logged In? " + this.isUserLoggedIn$);
        return userData;
      }
      ))
  }

}
