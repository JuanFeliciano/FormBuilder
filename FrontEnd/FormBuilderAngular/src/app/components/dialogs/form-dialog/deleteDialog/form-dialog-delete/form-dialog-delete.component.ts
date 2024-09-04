import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-form-dialog-delete',
  templateUrl: './form-dialog-delete.component.html',
  styleUrls: ['./form-dialog-delete.component.scss'],
})
export class FormDialogDeleteComponent {
  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @Input() deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.deleteEvent.subscribe(() => this.openDialogMessage(new Event('')));
  }

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
