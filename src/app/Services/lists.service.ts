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

  nameOfList: string;
  supplyListResponse: any;

  baseUrl = environment.baseUrl + "/supply-lists";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getUserLists(id:number) : Observable <SupplyList[]> {
    console.log("inside list service: ", this.baseUrl+`/get-lists/${id}`)
    return this.http.get<SupplyList[]>(this.baseUrl+`/get-lists/${id}`, this.httpOptions)
    .pipe(tap(data => console.log('fetch lists', data)),
      catchError(this.handleError<SupplyList[]>('error geting lists', null)));
  }

  createNewList(userId: number, listName: string): Observable<SupplyList> {
    this.nameOfList = listName;
    console.log(this.nameOfList, " ", listName);
    console.log(this.baseUrl+ `/create/${userId}`); 
    console.log("inside createNewList");
    return this.http.post<SupplyList>(this.baseUrl+`/create/${userId}`, this.nameOfList, this.httpOptions)
    .pipe(tap(data=> console.log("creating new list", data)),
    catchError(this.handleError<SupplyList>('error creating list', null)));
  }

  getListById(id:number) : Observable <SupplyList>{
    return this.http.get<SupplyList>(this.baseUrl+`/${id}`, this.httpOptions)
    .pipe(tap(data => console.log('fetching list', data)),
    catchError(this.handleError<SupplyList>('error fetching list', null)));
  }

  addItem(listId: number, itemDescription: string) : Observable<SupplyList> {
    return this.http.post<SupplyList>(this.baseUrl+`/add-item/${listId}`, itemDescription, this.httpOptions)
    .pipe(tap(data => console.log('adding item', data)),
    catchError(this.handleError<SupplyList>('error adding item', null)));
  }

  deleteItem(listId: number, itemId: number): Observable<SupplyList> {
    return this.http.delete<SupplyList>(this.baseUrl + `/delete-item/${listId}/${itemId}`,  this.httpOptions)
    .pipe(tap(data => console.log('deleting item', data)),
    catchError(this.handleError<SupplyList>('error deleting item', null)));
  }

  strikethruItem(listId: number, itemId: number): Observable<SupplyList>{
    console.log("inside service");
    return this.http.put<SupplyList>(this.baseUrl + `/strike-thru/${listId}/${itemId}`, this.httpOptions)
    .pipe(tap(data => console.log('striking item', data)),
    catchError(this.handleError<SupplyList>('error striking item', null)));
  }

  //rapidapi.com
  //weatherapi.com



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
