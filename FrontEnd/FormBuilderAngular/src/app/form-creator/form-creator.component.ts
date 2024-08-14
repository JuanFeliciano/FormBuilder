import { Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.scss'],
})
export class FormCreatorComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private el: ElementRef, private fb: FormBuilder) {}

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
      formTitle: [''],
      question: this.fb.array([]),
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
    console.log(this.formGroup.value);
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
