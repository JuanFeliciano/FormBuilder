import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupDialogCreateComponent } from './form-group-dialog-create.component';

describe('FormGroupDialogComponent', () => {
  let component: FormGroupDialogCreateComponent;
  let fixture: ComponentFixture<FormGroupDialogCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormGroupDialogCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormGroupDialogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
