import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessageComponent } from './dialog-message';

describe('FormGroupDialogUpdateComponent', () => {
  let component: DialogMessageComponent;
  let fixture: ComponentFixture<DialogMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
