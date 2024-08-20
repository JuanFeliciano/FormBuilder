import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Form } from 'src/app/interfaces/interfaces';
@Component({
  selector: 'app-box-form',
  templateUrl: './box-form.component.html',
  styleUrls: ['./box-form.component.scss'],
})
export class BoxFormComponent {
  @Input() selectedFormList: Form[] | undefined = undefined;

  selectedForm: Form | null = null;

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;

  openFormDialog(event: Event, form: Form) {
    event.stopPropagation();

    this.selectedForm = form;
    
    console.log(this.selectedForm);
    this.dialog.nativeElement.showModal();
  }

  closeFormDialog(event: Event) {
    event.stopPropagation();

    this.dialog.nativeElement.close();
    this.selectedForm = null;
  }
}
