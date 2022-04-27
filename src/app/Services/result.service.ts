import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RaceResult } from '../Models/race-result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  baseUrl = environment.baseUrl + "/race-results";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  createNewResult(raceResult: RaceResult): Observable<RaceResult>{
    //return this.http.post<RaceResult>(this.baseUrl+`/`)
    return this.http.post<RaceResult>(this.baseUrl+`/add-result`, raceResult, this.httpOptions)
    .pipe(tap(data => console.log("adding result")),
      catchError(this.handleError<RaceResult>('error adding race result')));
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
