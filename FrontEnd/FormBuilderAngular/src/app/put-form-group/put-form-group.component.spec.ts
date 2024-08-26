import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutFormGroupComponent } from './put-form-group.component';

describe('PutFormGroupComponent', () => {
  let component: PutFormGroupComponent;
  let fixture: ComponentFixture<PutFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutFormGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
