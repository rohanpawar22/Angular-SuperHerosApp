import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SearchNameComponent } from './search-name.component';

describe('SearchNameComponent', () => {
  let component: SearchNameComponent;
  let fixture: ComponentFixture<SearchNameComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchNameComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchNameComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchEvent when searchSuperHeroList is called', () => {
    const emitSpy = spyOn(component.searchEvent, 'emit');
    const keyword = 'superhero';
    component.searchForm.patchValue({ searchKeyword: keyword });
    component.searchSuperHeroList();
    expect(emitSpy).toHaveBeenCalledWith({ searchKeyword: keyword });
  });

  it('should unsubscribe valueChangesSubscription on destroy', () => {
    const unsubscribeSpy = spyOn(component.valueChangesSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should validate only letters in searchKeyword', () => {
    const control = formBuilder.control('');
    control.setValue('validname');
    expect(component.onlyLettersValidator()(control)).toBeNull();

    control.setValue('123invalidname');
    expect(component.onlyLettersValidator()(control)).toEqual({ invalidFormat: true });
  });

  // Add more tests for other component methods if needed
});
