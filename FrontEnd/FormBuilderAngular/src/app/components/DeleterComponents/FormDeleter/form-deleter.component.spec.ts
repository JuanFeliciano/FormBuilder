import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeleterComponent } from './form-deleter.component';

describe('FormDeleterComponent', () => {
  let component: FormDeleterComponent;
  let fixture: ComponentFixture<FormDeleterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDeleterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDeleterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
