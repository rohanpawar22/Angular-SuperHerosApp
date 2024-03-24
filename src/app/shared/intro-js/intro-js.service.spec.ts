import { TestBed } from '@angular/core/testing';
import { IntroJsService } from './intro-js.service';

describe('IntroJsService', () => {
  let service: IntroJsService;
  let originalIntroJs: any;

  originalIntroJs = (window as any).introJs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntroJsService);

    // Preserve original introJs function
    // @ts-nocheck
    originalIntroJs = (window as any).introJs;
  });

  afterEach(() => {
    // Restore original introJs function
    // @ts-nocheck
    (window as any).introJs = originalIntroJs;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call introJs().start() in introAboutApp()', () => {
    const startSpy = jasmine.createSpy();
    (window as any).introJs = () => ({
      setOptions: () => ({
        oncomplete: () => ({ onexit: () => ({ start: startSpy }) })
      })
    });

    service.introAboutApp();

    expect(startSpy).toHaveBeenCalled();
  });

  it('should call introJs().start() in introAboutDetails()', () => {
    const startSpy = jasmine.createSpy();
    (window as any).introJs = () => ({
      setOptions: () => ({
        oncomplete: () => ({ onexit: () => ({ start: startSpy }) })
      })
    });

    service.introAboutDetails();

    expect(startSpy).toHaveBeenCalled();
  });

  it('should call introJs().start() in introAboutBiography()', () => {
    const startSpy = jasmine.createSpy();
    (window as any).introJs = () => ({
      setOptions: () => ({
        oncomplete: () => ({ onexit: () => ({ start: startSpy }) })
      })
    });

    service.introAboutBiography();

    expect(startSpy).toHaveBeenCalled();
  });

  // Add more tests for other scenarios if needed
});
