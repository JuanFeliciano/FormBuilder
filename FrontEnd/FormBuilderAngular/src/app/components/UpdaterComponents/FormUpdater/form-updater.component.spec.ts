import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdaterComponent } from './form-updater.component';

describe('FormUpdaterComponent', () => {
  let component: FormUpdaterComponent;
  let fixture: ComponentFixture<FormUpdaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUpdaterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
