import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupDialogUpdateComponent } from './form-group-dialog-update.component';

describe('FormGroupDialogUpdateComponent', () => {
  let component: FormGroupDialogUpdateComponent;
  let fixture: ComponentFixture<FormGroupDialogUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGroupDialogUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGroupDialogUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
