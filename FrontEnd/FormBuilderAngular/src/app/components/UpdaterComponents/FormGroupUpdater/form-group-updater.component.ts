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
import { FormGroupModel } from 'src/app/models/interfaces/interfaces';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
import { DialogMessageComponent } from '../../../shared/MessageDialog/dialog-message';
@Component({
  selector: 'app-form-group-updater',
  templateUrl: './form-group-updater.component.html',
  styleUrls: ['./form-group-updater.component.scss'],
})
export class FormGroupUpdaterComponent implements OnInit, OnChanges {
  formGroup: FormGroup;
  selectFormGroupPut: FormGroupModel = { id: 0, title: '', forms: [] };

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild(DialogMessageComponent)
  dialogMessage: DialogMessageComponent;

  inputEvent: EventEmitter<string> = new EventEmitter<string>();

  @Input() formGroupInput: FormGroupModel;
  @Output() groupUpdated: EventEmitter<FormGroupModel> =
    new EventEmitter<FormGroupModel>();

  constructor(
    private formGroupService: FormGroupService,
    private fb: FormBuilder,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.formGroup = this.fb.group({
      id: 0,
      title: '',
    });
  }

  ngOnInit(): void {
    this.setClassInput();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroupInput']) {
      this.formGroup.patchValue({
        id: this.formGroupInput.id,
        title: this.formGroupInput.title,
      });
    }
  }

  getFormGroupByIdToPut(id: number): void {
    this.formGroupService.getFormGroupById(id).subscribe({
      next: (data: FormGroupModel) => {
        this.selectFormGroupPut = data;

        this.formGroup.patchValue({
          id: this.selectFormGroupPut.id,
          title: '',
        });

        this.dialog.nativeElement.showModal();
      },
      error: (err) => {
        console.error('Failed to fetch form group', err);
      },
    });
  }

  updateFormGroup(): void {
    if (this.formGroup.valid) {
      const formGroupData: FormGroupModel = {
        id: this.formGroupInput.id,
        title: this.formGroup.get('title')?.value as string,
        forms: [],
      };

      this.formGroupService.updateFormGroup(formGroupData).subscribe({
        next: (data: FormGroupModel) => {
          this.closePutDialog();
          this.groupUpdated.emit(data);
          this.dialogMessage.openDialog('Form Group Updated Successfully');
        },
        error: (error) => {
          console.error('Error updating Form Group', error);
        },
      });
    }
  }

  closePutDialog(): void {
    this.dialog.nativeElement.close();
    this.resetStyles();
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

  private resetStyles(): void {
    const input = this.el.nativeElement.querySelector('#groupTitle');
    const textInput = this.el.nativeElement.querySelector('.error-input');

    this.renderer.removeClass(input, 'error-message');
    this.renderer.setStyle(textInput, 'opacity', '0');
    this.renderer.setStyle(textInput, 'transform', 'translateY(20px)');
  }
}
