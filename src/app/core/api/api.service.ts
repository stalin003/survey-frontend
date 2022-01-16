import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  get(url: string): Observable<any> {
    return this.http.get(`${this.api}/${url}`, {responseType: 'json'});
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(`${this.api}/${url}`, body, {responseType: 'json'});
  }

  modPost(url: string, body: any): Observable<any> {
    return this.http.post(`${this.api}/${url}`, body, {observe:'response', responseType: 'json'});
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(`${this.api}/${url}`, body, {observe:'response', responseType: 'json'});
  }

  delete(url: string): Observable<any> {
    return this.http.delete(`${this.api}/${url}`, {observe:'response', responseType: 'text'});
  }
}
