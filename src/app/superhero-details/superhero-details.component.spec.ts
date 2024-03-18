import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroDetailsComponent } from './superhero-details.component';

describe('SuperheroDetailsComponent', () => {
  let component: SuperheroDetailsComponent;
  let fixture: ComponentFixture<SuperheroDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperheroDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperheroDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
