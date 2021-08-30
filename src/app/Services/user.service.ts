import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl=environment.baseUrl;
  //private isUserLoggedIn$: BehaviorSubject<boolean>;
  private createUserUrl: string = this.baseUrl + "/user/new";
  private checkEmailUrl: string = this.baseUrl + "/user/check-email";
  private emailJson;
  private createEmailJson: any;
  private email: string;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  createUser(userToCreate:User): Observable<User> {
    return this.http.post<User>(this.createUserUrl, userToCreate, this.httpOptions)
      .pipe(tap(data => {console.log("user created");}), 
      catchError(this.handleError<User>('error registering new user', null))
    )
  }

  checkUserEmailAvailability(emailToCheck: string): Observable<Boolean> {
    console.log("inside service check email");
    //this.createEmailJson =  {email: emailToCheck};
    this.emailJson = JSON.stringify({email: emailToCheck});
    console.log("String json object :", this.emailJson);
    console.log("Type :", typeof this.emailJson);
    this.email = emailToCheck;
    console.log("email sending thru ", this.email)
    //let reqData: Object = {"email": email};
    return this.http.post<Boolean>(this.checkEmailUrl, this.email, this.httpOptions)
      .pipe(tap(data => console.log("verifying email")));
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
