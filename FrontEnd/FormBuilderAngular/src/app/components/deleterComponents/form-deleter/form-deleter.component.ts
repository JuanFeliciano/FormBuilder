import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormService } from 'src/app/services/FormService/form.service';

@Component({
  selector: 'app-form-deleter',
  templateUrl: './form-deleter.component.html',
  styleUrls: ['./form-deleter.component.scss'],
})
export class FormDeleterComponent {
  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;

  constructor(private formService: FormService) {}

  deleteForm(id: number): void {
    this.formService.deleteForm(id).subscribe({
      next: () => {
        console.log('Form deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting form', err);
      },
    });
  }
}