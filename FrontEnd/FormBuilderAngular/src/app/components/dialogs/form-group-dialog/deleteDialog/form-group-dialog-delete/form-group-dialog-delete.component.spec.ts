import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupDialogDeleteComponent } from './form-group-dialog-delete.component';

describe('FormGroupDialogDeleteComponent', () => {
  let component: FormGroupDialogDeleteComponent;
  let fixture: ComponentFixture<FormGroupDialogDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGroupDialogDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGroupDialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
