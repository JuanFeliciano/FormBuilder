import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/FormService/form.service';
import { BoxQuestionComponent } from '../../boxComponents/box-question/box-question.component';
import { Form } from 'src/app/interfaces/interfaces';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-form-updater',
  templateUrl: './form-updater.component.html',
  styleUrls: ['./form-updater.component.scss'],
})
export class FormUpdaterComponent implements OnChanges {
  formGroup: FormGroup;
  @Input() formInput: Form;

  @ViewChild('dialogPut') dialogPut: ElementRef<HTMLDialogElement>;
  @ViewChild('dialogPutMessage')
  dialogPutMessage: ElementRef<HTMLDialogElement>;

  @ViewChild(BoxQuestionComponent) questionComponent: BoxQuestionComponent;

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.formGroup = this.fb.group({
      idGroup: 0,
      title: '',
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formInput']) {
      this.formGroup.patchValue({
        idGroup: this.formInput.idGroup,
        title: this.formInput.title,
      });
    }
  }

  updateForm(): void {
    console.log('chamada do metodo update', this.formInput);
    if (this.formGroup.valid && this.formInput) {
      const formData = {
        id: this.formInput.id,
        idGroup: this.formGroup.get('idGroup')?.value as number,
        title: this.formGroup.get('title')?.value as string,
        questions: [],
      };

      console.log('chamada do metodo update');
      this.formService.updateForm(formData.id, formData).subscribe({
        next: () => {
          this.dialogPut.nativeElement.close();
          this.dialogPutMessage.nativeElement.showModal();
        },
      });
    }
  }

  closeDialog(event: Event): void {
    event.stopPropagation();
    this.dialogPutMessage.nativeElement.close();
  }

  closePutDialog(event: Event) {
    event.stopPropagation();

    this.dialogPut.nativeElement.close();
  }
}
