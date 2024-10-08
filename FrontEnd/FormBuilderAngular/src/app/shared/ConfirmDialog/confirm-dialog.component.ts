import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @ViewChild('dialogPut') dialog: ElementRef<HTMLDialogElement>;
  @Output() shouldDelete: EventEmitter<boolean> = new EventEmitter<boolean>();

  openDialog() {
    if (this.dialog && this.dialog.nativeElement) {
      this.dialog.nativeElement.showModal();
    } else {
      console.error('Modal not open');
    }
  }

  wantDelete() {
    this.shouldDelete.emit(true);
    this.closeDialog();
  }

  onNope() {
    this.shouldDelete.emit(false);
    this.closeDialog();
  }

  closeDialog(): void {
    if (this.dialog) {
      this.dialog.nativeElement.close();
    }
  }
}
