import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRouteComponent } from './form-route.component';

describe('FormRouteComponent', () => {
  let component: FormRouteComponent;
  let fixture: ComponentFixture<FormRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
