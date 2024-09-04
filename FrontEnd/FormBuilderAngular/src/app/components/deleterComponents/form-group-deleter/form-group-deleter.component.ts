import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroupModel } from 'src/app/interfaces/interfaces';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
import { FormGroupDialogDeleteComponent } from '../../dialogs/form-group-dialog/deleteDialog/form-group-dialog-delete/form-group-dialog-delete.component';

@Component({
  selector: 'app-form-group-deleter',
  templateUrl: './form-group-deleter.component.html',
  styleUrls: ['./form-group-deleter.component.scss'],
})
export class FormGroupDeleterComponent {
  @Input() formGroupInput: FormGroupModel;
  @ViewChild(FormGroupDialogDeleteComponent)
  formGroupDeleteComponent: FormGroupDialogDeleteComponent;

  deleteEvent = new EventEmitter<void>();

  constructor(private formGroupService: FormGroupService) {}

  deleteFormGroup(formGroup: FormGroupModel): void {
    const confirmMsg = confirm('Are you sure about this?');

    if (confirmMsg) {
      this.formGroupService.deleteFormGroup(formGroup.id).subscribe({
        next: () => {
          console.log('Successfully deleting form Group');
          this.deleteEvent.emit();
        },
        error: (err) => {
          console.error('Error deleting form Group', err);
        },
      });
    }
  }
}
