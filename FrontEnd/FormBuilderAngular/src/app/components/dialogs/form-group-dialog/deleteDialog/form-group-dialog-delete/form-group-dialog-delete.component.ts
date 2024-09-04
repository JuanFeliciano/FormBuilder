import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-form-group-dialog-delete',
  templateUrl: './form-group-dialog-delete.component.html',
  styleUrls: ['./form-group-dialog-delete.component.scss'],
})
export class FormGroupDialogDeleteComponent implements OnInit {
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
