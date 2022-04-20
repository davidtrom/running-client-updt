import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  createNewResult(): Observable<RaceResult>{
    //return this.http.post<RaceResult>(this.baseUrl+`/`)
    return null;
  }
}
