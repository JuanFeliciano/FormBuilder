import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsRouteComponent } from './forms-route.component';

describe('FormsRouteComponent', () => {
  let component: FormsRouteComponent;
  let fixture: ComponentFixture<FormsRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
