import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
import { DialogMessageComponent } from '../../../shared/MessageDialog/dialog-message';
import { FormGroupModel } from 'src/app/models/interfaces/interfaces';
import { ConfirmDialogComponent } from '../../../shared/ConfirmDialog/confirm-dialog.component';

@Component({
  selector: 'app-form-group-deleter',
  templateUrl: './form-group-deleter.component.html',
  styleUrls: ['./form-group-deleter.component.scss'],
})
export class FormGroupDeleterComponent {
  @ViewChild(DialogMessageComponent) dialogMessage: DialogMessageComponent;
  @ViewChild(ConfirmDialogComponent) confirmDialog: ConfirmDialogComponent;

  @Output() groupDeleted: EventEmitter<void> = new EventEmitter<void>();

  constructor(private formGroupService: FormGroupService) {}

  deleteFormGroup(formGroup: FormGroupModel): void {
    this.confirmDialog.openDialog();

    this.confirmDialog.shouldDelete.subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
        this.formGroupService.deleteFormGroup(formGroup.id).subscribe({
          next: () => {
            this.groupDeleted.emit();
            this.dialogMessage.openDialog('Form Group Deleted Successfully');
          },
          error: (err) => {
            console.error('Error deleting form', err);
          },
        });
      }
    });
  }
}
