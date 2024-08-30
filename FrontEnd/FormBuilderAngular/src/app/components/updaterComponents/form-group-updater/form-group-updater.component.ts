import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupModel } from 'src/app/interfaces/interfaces';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';

@Component({
  selector: 'app-form-group-updater',
  templateUrl: './form-group-updater.component.html',
  styleUrls: ['./form-group-updater.component.scss'],
})
export class FormGroupUpdaterComponent implements OnChanges {
  formGroup: FormGroup;
  selectFormGroupPut: FormGroupModel = { id: 0, title: '', forms: [] };

  @ViewChild('dialogPut') dialogPut: ElementRef;
  @ViewChild('dialogPutMessage') dialogPutMessage: ElementRef;

  @Input() formGroupInput: FormGroupModel;

  constructor(
    private formGroupService: FormGroupService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      id: 0,
      title: '',
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroupInput']) {
      this.formGroup.patchValue({
        id: this.formGroupInput.id,
        title: this.formGroupInput.title,
      });
    }
  }

  getFormGroupByIdToPut(id: number): void {
    this.formGroupService.getFormGroupById(id).subscribe({
      next: (data: FormGroupModel) => {
        this.selectFormGroupPut = data;

        this.dialogPut.nativeElement.showModal();
      },
      error: (err) => {
        console.error('Failed to fetch form group', err);
      },
    });
  }

  updateFormGroup(): void {
    if (this.formGroup.valid) {
      const formGroupData = {
        id: this.formGroupInput.id,
        title: this.formGroup.get('title')?.value as string,
        forms: [],
      };

      this.formGroupService
        .updateFormGroup(formGroupData.id, formGroupData)
        .subscribe({
          next: () => {
            this.closePutDialog(new Event('Modal closed'));
            this.openDialogMessage(new Event('open modal'));
          },
          error: (error) => {
            console.error('Error updating Form Group', error);
          },
        });
    }
  }

  openDialogMessage(event: Event) {
    event.stopPropagation();
    this.dialogPutMessage.nativeElement.showModal();
  }

  closePutDialog(event: Event): void {
    event.stopPropagation();

    if (this.dialogPut.nativeElement.open) this.dialogPut.nativeElement.close();
  }

  closeDialogMessage(): void {
    if (this.dialogPutMessage) {
      this.dialogPutMessage.nativeElement.close();
    }
  }
}
