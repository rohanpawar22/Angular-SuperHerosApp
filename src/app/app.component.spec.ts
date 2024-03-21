import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd, ActivatedRoute, Event as RouterEvent } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { of, Subject, Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { SearchService } from './shared/services/search.service';
import { IntroJsService } from './shared/intro-js/intro-js.service';

// Define a mock ActivatedRoute object
class MockActivatedRoute {
  data = of({ title: 'Superhero List' });
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let searchServiceSpy: jasmine.SpyObj<SearchService>;
  let router: Router;
  let titleService: Title;
  let introServiceSpy: jasmine.SpyObj<IntroJsService>;
  let routerEventsSubject: Subject<RouterEvent>;

  beforeEach(async () => {
    const searchSpy = jasmine.createSpyObj('SearchService', ['setSearchData']);
    const introSpy = jasmine.createSpyObj('IntroJsService', ['introAboutApp']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: SearchService, useValue: searchSpy },
        { provide: IntroJsService, useValue: introSpy },
        // Provide the mock ActivatedRoute
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ],
    }).compileComponents();

    searchServiceSpy = TestBed.inject(SearchService) as jasmine.SpyObj<SearchService>;
    introServiceSpy = TestBed.inject(IntroJsService) as jasmine.SpyObj<IntroJsService>;
    router = TestBed.inject(Router);
    titleService = TestBed.inject(Title);

    // Initialize the router events subject
    routerEventsSubject = new Subject<RouterEvent>();
    // spyOn(router, 'events').and.returnValue(routerEventsSubject as Observable<RouterEvent>);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should update title and show search on navigation end', () => {
    routerEventsSubject.next(new NavigationEnd(1, '/path', '/path'));

    expect(titleService.getTitle()).toBe('Superhero List');
    expect(component.showSearch).toBe(true);
  });

  it('should set search data when getSearchKeyword is called', () => {
    component.getSearchKeyword({ searchKeyword: 'test' });
    expect(component.searchKeyword).toBe('test');
    expect(searchServiceSpy.setSearchData).toHaveBeenCalledWith('test');
  });

  it('should call introAboutApp after view initialization', () => {
    component.ngAfterViewInit();
    expect(introServiceSpy.introAboutApp).toHaveBeenCalled();
  });
});
