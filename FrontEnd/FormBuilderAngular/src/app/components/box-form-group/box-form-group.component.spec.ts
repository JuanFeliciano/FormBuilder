import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxFormGroupComponent } from './box-form-group.component';

describe('BoxFormComponent', () => {
  let component: BoxFormGroupComponent;
  let fixture: ComponentFixture<BoxFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxFormGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoxFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
