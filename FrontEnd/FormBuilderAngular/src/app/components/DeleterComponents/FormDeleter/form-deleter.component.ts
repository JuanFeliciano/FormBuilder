import { Component, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/FormService/form.service';
import { DialogMessageComponent } from '../../../shared/MessageDialog/dialog-message';
import { Form } from 'src/app/models/interfaces/interfaces';
import { ConfirmDialogComponent } from '../../../shared/ConfirmDialog/confirm-dialog.component';
@Component({
  selector: 'app-form-deleter',
  templateUrl: './form-deleter.component.html',
  styleUrls: ['./form-deleter.component.scss'],
})
export class FormDeleterComponent {
  wantDelete: boolean;

  @ViewChild(DialogMessageComponent) dialogMessage: DialogMessageComponent;
  @ViewChild(ConfirmDialogComponent) confirmDialog: ConfirmDialogComponent;

  constructor(private formService: FormService) {}

  deleteForm(form: Form): void {
    this.confirmDialog.openDialog();

    this.confirmDialog.shouldDelete.subscribe((shouldDelete: boolean) => {
      if (shouldDelete) {
        this.formService.deleteForm(form.id).subscribe({
          next: () => {
            this.dialogMessage.openDialog('Form Deleted Successfully');
          },
          error: (err) => {
            console.error('Error deleting form', err);
          },
        });
      }
    });
  }
}
