import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxAnswerComponent } from './box-answer.component';

describe('BoxAnswerComponent', () => {
  let component: BoxAnswerComponent;
  let fixture: ComponentFixture<BoxAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
