import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-form-dialog-update',
  templateUrl: './form-dialog-update.component.html',
  styleUrls: ['./form-dialog-update.component.scss'],
})
export class FormDialogUpdateComponent {
  @ViewChild('dialogPut') dialog: ElementRef<HTMLDialogElement>;
  @Input() updateEvent: EventEmitter<void>;

  ngOnInit(): void {
    this.updateEvent.subscribe(() => {
      this.openDialog();
    });
  }

  openDialog() {
    if (this.dialog && this.dialog.nativeElement) {
      this.dialog.nativeElement.showModal();
    } else {
      console.error('Modal not open');
    }
  }

  closeDialog(): void {
    if (this.dialog) {
      this.dialog.nativeElement.close();
    }
  }
}
