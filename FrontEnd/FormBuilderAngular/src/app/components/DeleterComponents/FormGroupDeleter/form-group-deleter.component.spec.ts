import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupDeleterComponent } from './form-group-deleter.component';

describe('FormGroupDeleterComponent', () => {
  let component: FormGroupDeleterComponent;
  let fixture: ComponentFixture<FormGroupDeleterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGroupDeleterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGroupDeleterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
