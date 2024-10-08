import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpsRouteComponent } from './nps-route.component';

describe('NpsRouteComponent', () => {
  let component: NpsRouteComponent;
  let fixture: ComponentFixture<NpsRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpsRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
