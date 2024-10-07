import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCreatorComponent } from './question-creator.component';

describe('QuestionCreatorComponent', () => {
  let component: QuestionCreatorComponent;
  let fixture: ComponentFixture<QuestionCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
