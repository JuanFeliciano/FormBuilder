import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionUpdaterComponent } from './question-updater.component';

describe('QuestionUpdaterComponent', () => {
  let component: QuestionUpdaterComponent;
  let fixture: ComponentFixture<QuestionUpdaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionUpdaterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
