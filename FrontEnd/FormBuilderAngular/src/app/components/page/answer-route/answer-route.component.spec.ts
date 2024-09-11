import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerRouteComponent } from './answer-route.component';

describe('AnswerRouteComponent', () => {
  let component: AnswerRouteComponent;
  let fixture: ComponentFixture<AnswerRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
