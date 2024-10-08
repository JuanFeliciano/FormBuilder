import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupUpdaterComponent } from './form-group-updater.component';

describe('FormGroupUpdaterComponent', () => {
  let component: FormGroupUpdaterComponent;
  let fixture: ComponentFixture<FormGroupUpdaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGroupUpdaterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGroupUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
