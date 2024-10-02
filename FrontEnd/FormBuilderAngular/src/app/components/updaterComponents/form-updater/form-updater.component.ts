import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/FormService/form.service';
import { Form, FormGroupModel } from 'src/app/interfaces/interfaces';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
import { DialogMessageComponent } from '../../dialogs/dialog-message';

@Component({
  selector: 'app-form-updater',
  templateUrl: './form-updater.component.html',
  styleUrls: ['./form-updater.component.scss'],
})
export class FormUpdaterComponent implements OnInit, OnChanges {
  formGroup: FormGroup;
  formsGroups: FormGroupModel[];
  updateEvent: EventEmitter<void> = new EventEmitter<void>();

  @Input() formInput: Form;

  @ViewChild('dialogPut') dialogPut: ElementRef<HTMLDialogElement>;
  @ViewChild(DialogMessageComponent)
  dialogMessage: DialogMessageComponent;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private formGroupService: FormGroupService
  ) {
    this.formGroup = this.fb.group({
      idGroup: 0,
      title: '',
    });
  }

  ngOnInit(): void {
    this.getFormGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formInput']) {
      this.formGroup.patchValue({
        idGroup: 0,
        title: this.formInput.title,
      });
    }
  }

  updateForm(): void {
    if (this.formGroup.valid && this.formInput) {
      const formData: Form = {
        id: this.formInput.id,
        idGroup: this.formGroup.get('idGroup')?.value as number,
        title: this.formGroup.get('title')?.value as string,
        questions: [],
      };

      this.formService.updateForm(formData).subscribe({
        next: () => {
          this.dialogPut.nativeElement.close();
          this.dialogMessage.openDialog('Form Updated Successfully');

          this.updateEvent.emit();
        },
      });
    }
  }

  getFormGroup(): void {
    this.formGroupService.getFormGroup().subscribe({
      next: (data: FormGroupModel[]) => {
        this.formsGroups = data;
      },
      error: (err) => {
        console.log('Error fetching form group', err);
      },
    });
  }

  closePutDialog(event: Event) {
    event.stopPropagation();

    this.dialogPut.nativeElement.close();
  }
}
