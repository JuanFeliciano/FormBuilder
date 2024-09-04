import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogDeleteComponent } from './form-dialog-delete.component';

describe('FormDialogDeleteComponent', () => {
  let component: FormDialogDeleteComponent;
  let fixture: ComponentFixture<FormDialogDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
