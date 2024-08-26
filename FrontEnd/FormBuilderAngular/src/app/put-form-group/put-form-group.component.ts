import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupService } from '../services/FormGroupService/form-gp.service';

@Component({
  selector: 'app-put-form-group',
  templateUrl: './put-form-group.component.html',
  styleUrls: ['./put-form-group.component.scss'],
})
export class PutFormGroupComponent {
  formGroup: FormGroup;
  event: Event;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('dialog-message') dialogMessage: ElementRef;
  @Input() idFormGroup: number;
  @Input() titleFormGroup: string;

  constructor(
    private fb: FormBuilder,
    private formGroupService: FormGroupService
  ) {}

  ngOnInit(): void {
    if (!HTMLDialogElement.prototype.showModal) {
      console.error('your browser does not support the <dialog> element');
    }

    this.formGroup = this.fb.group({
      groupTitle: [''],
      forms: this.fb.array([]),
    });
  }

  submit(): void {
    if (this.formGroup.valid) {
      const formGroupData = {
        id: this.formGroup.get('id')?.value,
        title: this.formGroup.get('groupTitle')?.value,
        forms: [],
      };

      this.formGroupService
        .updateFormGroup(this.idFormGroup, formGroupData)
        .subscribe({
          next: (response) => {
            console.log('Form Group updated successfully', response);
            this.openDialogMessage(new Event('abrindo modal message'));
          },
          error: (error) => {
            console.error('Error updating Form Group', error);
          },
        });
    }
  }

  openDialog(event: Event): void {
    event.stopPropagation();
    this.dialog.nativeElement.showModal();
  }

  closeDialog(): void {
    this.dialog.nativeElement.close();
  }

  openDialogMessage(event: Event) {
    event.stopPropagation();
    console.log('abrindo modal message');
    this.dialogMessage.nativeElement.showModal();
  }

  closeDialogMessage(event: Event): void {
    event.stopPropagation();
    this.dialogMessage.nativeElement.close();
  }
}
