import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientWrapperService {

  constructor(private httpClient: HttpClient) { }

  get(path: any, options?: any): Observable<any> {
    return this.httpClient.get(path)
  }

}
