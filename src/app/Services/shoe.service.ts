import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RaceShoe } from '../Models/race-shoe.model';

@Injectable({
  providedIn: 'root'
})
export class ShoeService {

  baseUrl = environment.baseUrl + "/shoes";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getUserShoes(userId:number) : Observable <RaceShoe[]> {
    console.log("inside shoe service: ", this.baseUrl+`/closet/${userId}`)
    return this.http.get<RaceShoe[]>(this.baseUrl+`/closet/${userId}`, this.httpOptions)
    .pipe(tap(data => console.log('fetch user shoes', data)),
      catchError(this.handleError<RaceShoe[]>('error getting shoes', null)));
  }

  createUserShoe(newShoe: RaceShoe): Observable<RaceShoe>{
    return this.http.post<RaceShoe>(this.baseUrl+`/add-shoe`, newShoe, this.httpOptions)
    .pipe(tap(data=> console.log("creating new shoe", data)),
    catchError(this.handleError<RaceShoe>('error creating shoe', null)));
  }

  getShoeById(shoeId: number): Observable<RaceShoe> {
    return this.http.get<RaceShoe>(this.baseUrl + `/shoe-detail/${shoeId}`, this.httpOptions)
    .pipe(tap(data=> console.log("getting shoe by id", data)),
    catchError(this.handleError<RaceShoe>('error getting shoe', null)));
  }

  getActiveShoes(userId: number): Observable<RaceShoe[]>{
    return this.http.get<RaceShoe[]>(this.baseUrl + `/get-active/${userId}`, this.httpOptions)
    .pipe(tap(data => console.log("getting active shoes for user", data)),
    catchError(this.handleError<RaceShoe[]>('error getting active shoes for user', null)));
  }

  getRetiredShoes(userId: number): Observable<RaceShoe[]>{
    return this.http.get<RaceShoe[]>(this.baseUrl + `/get-retired/${userId}`, this.httpOptions)
    .pipe(tap(data => console.log("getting retired shoes for user", data)),
    catchError(this.handleError<RaceShoe[]>('error getting retired shoes for user', null)));
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
