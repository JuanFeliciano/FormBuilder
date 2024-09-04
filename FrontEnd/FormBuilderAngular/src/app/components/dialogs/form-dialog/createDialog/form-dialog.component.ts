import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent {
  @ViewChild('dialogMessage') dialogMessage: ElementRef;


  openDialogMessage(event: Event): void {
    event.stopPropagation();
    this.dialogMessage.nativeElement.showModal();
  }

  closeDialogMessage(): void {
    this.dialogMessage.nativeElement.close();
  }
}
