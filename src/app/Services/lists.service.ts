import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SupplyList } from '../Models/supply-list.model';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  baseUrl = environment.baseUrl + "/travel-list";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getUserLists() : Observable <SupplyList[]> {
    console.log("inside list service: ", this.baseUrl+"/lists")
    return this.http.get<SupplyList[]>(this.baseUrl+"/lists", this.httpOptions)
    .pipe(tap(data => console.log('fetch lists', data)),
      catchError(this.handleError<SupplyList[]>('error geting lists', null)));
  }

  createNewList(listName: string): Observable<SupplyList> {
    return this.http.post<SupplyList>(this.baseUrl+"/", listName, this.httpOptions)
    .pipe(tap(data=> console.log("creating new list")),
    catchError(this.handleError<SupplyList>('error creating list', null)));
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
