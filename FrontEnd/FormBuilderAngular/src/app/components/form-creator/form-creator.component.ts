import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.scss'],
})
export class FormCreatorComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private el: ElementRef,
    private fb: FormBuilder,
    private formGroupService: FormGroupService
  ) {}

  ngOnInit(): void {
    if (!HTMLDialogElement.prototype.showModal) {
      console.error('your browser does not support the <dialog> element');
    }

    this.formGroup = this.fb.group({
      groupTitle: [''],
      forms: this.fb.array([]),
    });
  }

  get forms(): FormArray {
    return this.formGroup.get('forms') as FormArray;
  }

  addForm(): void {
    const formGroup = this.fb.group({
      formTitle: ['', Validators.required],
      questions: this.fb.array([]),
    });

    this.forms.push(formGroup);
  }

  removeForm(index: number): void {
    this.forms.removeAt(index);
  }

  getQuestions(index: number): FormArray {
    return this.forms.at(index).get('questions') as FormArray;
  }

  addQuestion(formIndex: number): void {
    const questions = this.getQuestions(formIndex);
    questions.push(new FormControl(''));
  }

  removeQuestion(formIndex: number, questionIndex: number): void {
    const questions = this.getQuestions(formIndex);
    questions.removeAt(questionIndex);
  }

  submit(): void {
    if (this.formGroup.valid) {
      this.formGroupService
        .createFormGroup(this.formGroup.value)
        .pipe(
          tap((response) => {
            console.log('Form Group create successfully', response);
            this.closeDialog();
          })
        )
        .subscribe((error) => {
          console.error('Error creating Form Group', error);
        });
    } else {
      console.error('Form is invalid');
    }
  }

  openDialog(): void {
    const dialog = this.el.nativeElement.querySelector(
      '.dialog'
    ) as HTMLDialogElement;

    if (dialog) {
      dialog.showModal();
    }
  }

  closeDialog(): void {
    const dialog = this.el.nativeElement.querySelector(
      '.dialog'
    ) as HTMLDialogElement;

    if (dialog) {
      dialog.close();
    }
  }
}
