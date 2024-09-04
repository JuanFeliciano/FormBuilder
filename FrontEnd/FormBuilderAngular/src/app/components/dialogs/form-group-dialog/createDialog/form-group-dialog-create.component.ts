import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form-group-dialog-create',
  templateUrl: './form-group-dialog-create.component.html',
  styleUrls: ['./form-group-dialog-create.component.scss'],
})
export class FormGroupDialogCreateComponent {
  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;

  openDialogMessage(event: Event): void {
    event.stopPropagation();
    if (this.dialog && this.dialog.nativeElement) {
      this.dialog.nativeElement.showModal();
    } else {
      console.error('Modal not open');
    }
  }

  closeDialogMessage(): void {
    this.dialog.nativeElement.close();
  }
}
