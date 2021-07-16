import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../Models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl=environment.baseUrl;
  private isUserLoggedIn$: BehaviorSubject<boolean>;
  private loginUrl: string = this.baseUrl + "/authenticate";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

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
    // this.updateLoggedInStatus(false);
    // this.updateCurrentRecipient(null);
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
        console.log("User Logged In? " + this.isUserLoggedIn$);
        return userData;
      }
      ))
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
