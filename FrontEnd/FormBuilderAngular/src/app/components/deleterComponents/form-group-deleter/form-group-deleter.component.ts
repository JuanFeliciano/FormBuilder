import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroupModel } from 'src/app/interfaces/interfaces';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';

@Component({
  selector: 'app-form-group-deleter',
  templateUrl: './form-group-deleter.component.html',
  styleUrls: ['./form-group-deleter.component.scss'],
})
export class FormGroupDeleterComponent {
  @Input() formGroupInput: FormGroupModel;
  @Output() formGroupDeleted = new EventEmitter<void>();

  @ViewChild('dialogDeleteMessage')
  dialogDeleteMessage: ElementRef<HTMLDialogElement>;

  constructor(private formGroupService: FormGroupService) {}

  // ngAfterViewInit(): void {
  //   if (!this.dialogDeleteMessage) {
  //     console.error('Dialog element not found or not yet initialized');
  //   }
  // }

  deleteFormGroup(formGroup: FormGroupModel): void {
    const confirmMsg = confirm('Are you sure about this?');

    if (confirmMsg) {
      this.formGroupService.deleteFormGroup(formGroup.id).subscribe({
        next: () => {
          console.log('Successfully deleting form Group');
        },
        error: (err) => {
          console.error('Error deleting form Group', err);
        },
      });
    }
  }

  // closeDialogMessageDelete(): void {
  //   if (this.dialogDeleteMessage && this.dialogDeleteMessage.nativeElement) {
  //     this.dialogDeleteMessage.nativeElement.close();
  //   }
  // }

  // openDialog(): void {
  //   if (this.dialogDeleteMessage && this.dialogDeleteMessage.nativeElement) {
  //     this.dialogDeleteMessage.nativeElement.showModal();
  //   } else {
  //     console.error('Dialog element not found or not yet initialized.');
  //   }
  // }
}
