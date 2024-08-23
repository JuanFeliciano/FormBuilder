import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupCreatorComponent } from './form-group-creator.component';

describe('FormCreatorComponent', () => {
  let component: FormGroupCreatorComponent;
  let fixture: ComponentFixture<FormGroupCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormGroupCreatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormGroupCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
