import { Component, ViewChild } from '@angular/core';
import { DialogMessageComponent } from '../../dialogs/dialog-message';
import { FormService } from 'src/app/services/FormService/form.service';
import { Form } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-form-deleter',
  templateUrl: './form-deleter.component.html',
  styleUrls: ['./form-deleter.component.scss'],
})
export class FormDeleterComponent {
  @ViewChild(DialogMessageComponent) dialogMessage: DialogMessageComponent;

  constructor(private formService: FormService) {}

  deleteForm(form: Form): void {
    const confirmMsg = confirm('Are you sure about this?');

    if (confirmMsg) {
      this.formService.deleteForm(form.id).subscribe({
        next: () => {
          this.dialogMessage.openDialog('Form Deleted Successfully');
        },
        error: (err) => {
          console.error('Error deleting form', err);
        },
      });
    }
  }
}
