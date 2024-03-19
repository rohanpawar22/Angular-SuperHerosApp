import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiographyDetailsComponent } from './biography-details.component';

describe('BiographyDetailsComponent', () => {
  let component: BiographyDetailsComponent;
  let fixture: ComponentFixture<BiographyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BiographyDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiographyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
