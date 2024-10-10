import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.html',
  styleUrls: ['./dialog-message.scss'],
})
export class DialogMessageComponent {
  message: string = '';

  @ViewChild('dialogPut') dialog: ElementRef<HTMLDialogElement>;

  openDialog(message: string) {
    if (this.dialog && this.dialog.nativeElement) {
      this.message = message;
      this.dialog.nativeElement.showModal();
    } else {
      console.error('Modal not open');
    }
  }

  closeDialog(): void {
    if (this.dialog) {
      this.dialog.nativeElement.close();
      console.log('fechando modal');
    }
  }
}
