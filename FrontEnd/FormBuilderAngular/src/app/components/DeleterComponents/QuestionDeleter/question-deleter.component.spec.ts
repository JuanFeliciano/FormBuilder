import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDeleterComponent } from './question-deleter.component';

describe('QuestionDeleterComponent', () => {
  let component: QuestionDeleterComponent;
  let fixture: ComponentFixture<QuestionDeleterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionDeleterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionDeleterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
