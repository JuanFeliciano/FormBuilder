import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupModel } from 'src/app/models/interfaces/interfaces';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
import { DialogMessageComponent } from '../../../shared/MessageDialog/dialog-message';
@Component({
  selector: 'app-form-group-updater',
  templateUrl: './form-group-updater.component.html',
  styleUrls: ['./form-group-updater.component.scss'],
})
export class FormGroupUpdaterComponent implements OnChanges {
  formGroup: FormGroup;
  selectFormGroupPut: FormGroupModel = { id: 0, title: '', forms: [] };

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild(DialogMessageComponent)
  dialogMessage: DialogMessageComponent;

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

        this.formGroup.patchValue({
          id: this.selectFormGroupPut.id,
          title: '',
        });

        this.dialog.nativeElement.showModal();
      },
      error: (err) => {
        console.error('Failed to fetch form group', err);
      },
    });
  }

  updateFormGroup(): void {
    if (this.formGroup.valid) {
      const formGroupData: FormGroupModel = {
        id: this.formGroupInput.id,
        title: this.formGroup.get('title')?.value as string,
        forms: [],
      };

      this.formGroupService.updateFormGroup(formGroupData).subscribe({
        next: () => {
          this.closePutDialog();
          this.dialogMessage.openDialog('Form Group Updated Successfully');
        },
        error: (error) => {
          console.error('Error updating Form Group', error);
        },
      });
    }
  }

  closePutDialog(): void {
    this.dialog.nativeElement.close();
  }
}
