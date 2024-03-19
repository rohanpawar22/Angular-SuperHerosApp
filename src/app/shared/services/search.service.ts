import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  searchData$: Observable<any> = this.searchDataSubject.asObservable();

  constructor() { }

  setSearchData(data: any) {
    this.searchDataSubject.next(data);
  }

  clearSearchData() {
    this.searchDataSubject.next(null);
  }

}
