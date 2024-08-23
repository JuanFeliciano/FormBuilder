import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxQuestionComponent } from './box-question.component';

describe('BoxQuestionComponent', () => {
  let component: BoxQuestionComponent;
  let fixture: ComponentFixture<BoxQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
