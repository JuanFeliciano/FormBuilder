import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogUpdateComponent } from './form-dialog-update.component';

describe('FormDialogUpdateComponent', () => {
  let component: FormDialogUpdateComponent;
  let fixture: ComponentFixture<FormDialogUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDialogUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
