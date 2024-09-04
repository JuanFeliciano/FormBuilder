import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-form-group-dialog-update',
  templateUrl: './form-group-dialog-update.component.html',
  styleUrls: ['./form-group-dialog-update.component.scss'],
})
export class FormGroupDialogUpdateComponent implements OnInit {
  @ViewChild('dialogPut') dialog: ElementRef<HTMLDialogElement>;
  @Input() updateEvent: EventEmitter<void>;

  ngOnInit(): void {
    this.updateEvent.subscribe(() => {
      console.log('a');
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
