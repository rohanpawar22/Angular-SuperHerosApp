import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientWrapperService } from '../../shared/services/http-client-wrapper.service';
import { IntroJsService } from '../../shared/intro-js/intro-js.service';
import { of } from 'rxjs';

import { BiographyDetailsComponent } from './biography-details.component';

describe('BiographyDetailsComponent', () => {
  let component: BiographyDetailsComponent;
  let fixture: ComponentFixture<BiographyDetailsComponent>;
  let httpClientService: HttpClientWrapperService;
  let introJsService: IntroJsService;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BiographyDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1' // Replace '1' with any ID you want to test
              }
            }
          }
        },
        HttpClientWrapperService,
        IntroJsService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BiographyDetailsComponent);
    component = fixture.componentInstance;

    httpClientService = TestBed.inject(HttpClientWrapperService);
    introJsService = TestBed.inject(IntroJsService);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch superhero details on init', () => {
    const fetchSpy = spyOn(component, 'fetchDetailsFromId').and.callThrough();
    component.ngOnInit();
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('should call introService onAfterViewInit', () => {
    const introSpy = spyOn(introJsService, 'introAboutBiography');
    component.ngAfterViewInit();
    expect(introSpy).toHaveBeenCalled();
  });

  it('should fetch superhero details from API', () => {
    const mockData = { /* mocked data here */ };
    const getSpy = spyOn(httpClientService, 'get').and.returnValue(of(mockData));
    component.fetchDetailsFromId();
    expect(getSpy).toHaveBeenCalled();
    expect(component.superHeroDetails).toEqual(mockData);
    expect(component.loadingFlag).toBeFalsy();
  });

  // Add more tests for other component methods if needed
});
