import { Component, ViewChild } from '@angular/core';
import { FormGroupModel } from 'src/app/interfaces/interfaces';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
import { DialogMessageComponent } from '../../dialogs/dialog-message';

@Component({
  selector: 'app-form-group-deleter',
  templateUrl: './form-group-deleter.component.html',
  styleUrls: ['./form-group-deleter.component.scss'],
})
export class FormGroupDeleterComponent {
  @ViewChild(DialogMessageComponent) dialogMessage: DialogMessageComponent;

  constructor(private formGroupService: FormGroupService) {}

  deleteFormGroup(formGroup: FormGroupModel): void {
    const confirmMsg = confirm('Are you sure about this?');

    if (confirmMsg) {
      this.formGroupService.deleteFormGroup(formGroup.id).subscribe({
        next: () => {
          this.dialogMessage.openDialog('Form Group Deleted Successfully');
        },
        error: (err) => {
          console.error('Error deleting form Group', err);
        },
      });
    }
  }
}
