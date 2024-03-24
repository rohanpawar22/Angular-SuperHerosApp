import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';
import { take } from 'rxjs/operators';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set search data correctly', () => {
    const testData = 'test data';
    service.setSearchData(testData);

    service.searchData$.pipe(take(1)).subscribe(data => {
      expect(data).toEqual(testData);
    });
  });

  it('should clear search data correctly', () => {
    const testData = 'test data';
    service.setSearchData(testData);

    service.clearSearchData();

    service.searchData$.pipe(take(1)).subscribe(data => {
      expect(data).toBeNull();
    });
  });
});
