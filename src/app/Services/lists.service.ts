import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClientList } from '../Models/client-list.model';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  baseUrl = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getAllLists() : Observable <ClientList[]> {
    console.log("inside list service: ", this.baseUrl+"/lists")
    return this.http.get<ClientList[]>(this.baseUrl+"/lists", this.httpOptions)
    .pipe(tap(data => console.log('fetch lists', data)),
      catchError(this.handleError<ClientList[]>('error geting lists', null)));
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
