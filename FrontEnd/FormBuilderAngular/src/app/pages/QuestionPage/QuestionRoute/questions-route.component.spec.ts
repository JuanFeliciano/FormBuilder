import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsRouteComponent } from './questions-route.component';

describe('QuestionsRouteComponent', () => {
  let component: QuestionsRouteComponent;
  let fixture: ComponentFixture<QuestionsRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
