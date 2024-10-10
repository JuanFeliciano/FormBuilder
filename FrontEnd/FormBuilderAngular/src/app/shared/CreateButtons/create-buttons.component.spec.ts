import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudButtonsComponent } from './create-buttons.component';

describe('CrudButtonsComponent', () => {
  let component: CrudButtonsComponent;
  let fixture: ComponentFixture<CrudButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudButtonsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrudButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
