import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { SuperheroDetailsComponent } from './superhero-details.component';
import { HttpClientWrapperService } from '../shared/services/http-client-wrapper.service';
import { IntroJsService } from '../shared/intro-js/intro-js.service';

describe('SuperheroDetailsComponent', () => {
  let component: SuperheroDetailsComponent;
  let fixture: ComponentFixture<SuperheroDetailsComponent>;
  let httpClientService: HttpClientWrapperService;
  let introJsService: IntroJsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperheroDetailsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [IntroJsService]
    }).compileComponents();

    fixture = TestBed.createComponent(SuperheroDetailsComponent);
    component = fixture.componentInstance;

    httpClientService = TestBed.inject(HttpClientWrapperService);
    introJsService = TestBed.inject(IntroJsService);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch superhero details on init', () => {
    const fetchSpy = spyOn(component, 'fetchDetailsFromId').and.callThrough();
    component.ngOnInit();
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('should go back to superhero list', () => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    component.goBackHome();
    expect(navigateSpy).toHaveBeenCalledWith('superhero-list');
  });

  // Add more tests for other component methods if needed
});
