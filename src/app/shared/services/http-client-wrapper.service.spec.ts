import { HttpClient } from '@angular/common/http';
import { HttpClientWrapperService } from './http-client-wrapper.service';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

describe('HttpClientWrapperService', () => {
  let httpClient: jasmine.SpyObj<HttpClient>;
  let service: HttpClientWrapperService;

  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    });
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    service = TestBed.inject(HttpClientWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HttpClient.get with the provided path', () => {
    const path = 'test/path';
    httpClient.get.and.returnValue(of({}));

    service.get(path);

    expect(httpClient.get).toHaveBeenCalledWith(path);
  });

  // Add more tests for other methods if needed
});
