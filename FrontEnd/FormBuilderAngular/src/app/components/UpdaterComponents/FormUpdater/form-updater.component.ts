import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/FormService/form.service';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
import { Form, FormGroupModel } from 'src/app/models/interfaces/interfaces';
import { DialogMessageComponent } from '../../../shared/MessageDialog/dialog-message';

@Component({
  selector: 'app-form-updater',
  templateUrl: './form-updater.component.html',
  styleUrls: ['./form-updater.component.scss'],
})
export class FormUpdaterComponent implements OnInit, OnChanges {
  formGroup: FormGroup;
  formsGroups: FormGroupModel[];
  changeForm: EventEmitter<void> = new EventEmitter<void>();

  @Input() formInput: Form;
  @Output() formUpdated: EventEmitter<Form> = new EventEmitter<Form>();

  inputEvent: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('dialogPut') dialogPut: ElementRef<HTMLDialogElement>;
  @ViewChild(DialogMessageComponent)
  dialogMessage: DialogMessageComponent;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private formGroupService: FormGroupService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.formGroup = this.fb.group({
      idGroup: 0,
      title: '',
    });
  }

  ngOnInit(): void {
    this.getFormGroup();

    this.formGroupService.formGroupCreated.subscribe(() => {
      this.getFormGroup();
    });

    this.setClassInput();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formInput']) {
      this.formGroup.patchValue({
        idGroup: 0,
        title: '',
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
        next: (data: Form) => {
          this.formUpdated.emit(data);

          if (formData.idGroup != this.formInput.idGroup) {
            this.changeForm.emit();
          }

          this.dialogPut.nativeElement.close();
          this.dialogMessage.openDialog('Form Updated Successfully');
        },
        error: (err) => {
          console.error('Error when updating form', err);

          console.log('idgrupo zero ');
          this.setClassSelect();
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

  closePutDialog() {
    this.resetStyles();
    this.dialogPut.nativeElement.close();
    this.formGroup.reset();
  }

  onInput(event: any): void {
    const value = event.target.value;
    const input = this.el.nativeElement.querySelector('#groupTitle');
    const text = this.el.nativeElement.querySelector('.error-input');

    if (value.length > 25) {
      this.inputEvent.emit();
    } else {
      this.renderer.removeClass(input, 'error-message');
      this.renderer.setStyle(text, 'opacity', '0');
      this.renderer.setStyle(text, 'transform', 'translateY(20px)');
    }
  }

  private setClassInput(): void {
    const input = this.el.nativeElement.querySelector('#groupTitle');
    const text = this.el.nativeElement.querySelector('.error-input');

    this.inputEvent.subscribe(() => {
      this.renderer.addClass(input, 'error-message');
      this.renderer.setStyle(text, 'opacity', '1');
      this.renderer.setStyle(text, 'transform', 'translateY(0)');
    });
  }

  private setClassSelect(): void {
    const select = this.el.nativeElement.querySelector('select');
    const text = this.el.nativeElement.querySelector('.error-select');

    this.renderer.addClass(select, 'select-empty');
    this.renderer.setStyle(text, 'opacity', '1');
    this.renderer.setStyle(text, 'transform', 'translateY(0)');
  }

  private resetStyles(): void {
    const input = this.el.nativeElement.querySelector('#groupTitle');
    const textInput = this.el.nativeElement.querySelector('.error-input');
    const select = this.el.nativeElement.querySelector('select');
    const textSelect = this.el.nativeElement.querySelector('.error-select');

    this.renderer.removeClass(input, 'error-message');
    this.renderer.setStyle(textInput, 'opacity', '0');
    this.renderer.setStyle(textInput, 'transform', 'translateY(20px)');
    this.renderer.removeClass(select, 'select-empty');
    this.renderer.setStyle(textSelect, 'opacity', '0');
    this.renderer.setStyle(textSelect, 'transform', 'translateY(20px)');
  }
}
