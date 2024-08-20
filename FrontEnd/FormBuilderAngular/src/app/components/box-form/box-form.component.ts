import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Form } from 'src/app/interfaces/interfaces';
import { FormService } from 'src/app/services/FormService/form.service';

@Component({
  selector: 'app-box-form',
  templateUrl: './box-form.component.html',
  styleUrls: ['./box-form.component.scss'],
})
export class BoxFormComponent {
  @Input() selectedFormList: Form[] | undefined = undefined;

  selectedForm: Form | null = null;

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  constructor(private formService: FormService) {}

  getFormById(id: number): void {
    this.formService.getFormById(id).subscribe({
      next: (data: Form) => {
        this.selectedForm = data;
        console.log(this.selectedForm);

        this.dialog.nativeElement.showModal();
      },
      error: (err) => {
        console.error('Failed to fetch form', err);
      },
    });
  }

  openFormDialog(event: Event, id: number) {
    event.stopPropagation();
    this.getFormById(id);
  }

  closeFormDialog(event: Event) {
    event.stopPropagation();

    this.dialog.nativeElement.close();
  }
}
