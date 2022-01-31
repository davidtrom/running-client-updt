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

  getUserShoes(id:number) : Observable <RaceShoe[]> {
    console.log("inside shoe service: ", this.baseUrl+`/closet/${id}`)
    return this.http.get<RaceShoe[]>(this.baseUrl+`/closet/${id}`, this.httpOptions)
    .pipe(tap(data => console.log('fetch lists', data)),
      catchError(this.handleError<RaceShoe[]>('error geting lists', null)));
  }

  createUserShoe(newShoe: RaceShoe){
    return this.http.post<RaceShoe>(this.baseUrl+`/add-shoe`, newShoe, this.httpOptions)
    .pipe(tap(data=> console.log("creating new shoe", data)),
    catchError(this.handleError<RaceShoe>('error creating shoe', null)));
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
