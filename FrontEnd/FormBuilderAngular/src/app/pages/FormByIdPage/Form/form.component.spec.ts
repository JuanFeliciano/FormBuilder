import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLinkComponent } from './form.component';

describe('FormLinkComponent', () => {
  let component: FormLinkComponent;
  let fixture: ComponentFixture<FormLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
