import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormService } from '../../../services/FormService/form.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormGroupModel, Question } from '../../../interfaces/interfaces';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
import { FormDialogComponent } from '../../dialogs/form-dialog/createDialog/form-dialog.component';

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.scss'],
})
export class FormCreatorComponent {
  formGroup: FormGroup;
  formsGroup: FormGroupModel[];

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild(FormDialogComponent) formDialog: FormDialogComponent;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private formGroupService: FormGroupService
  ) {}

  ngOnInit(): void {
    this.getFormGroup();

    if (!HTMLDialogElement.prototype.showModal) {
      console.error('your browser does not support the <dialog> element');
    }

    this.formGroup = this.fb.group({
      id: [null],
      idGroup: [null],
      title: ['', Validators.required],
      questions: this.fb.array([]),
    });
  }

  getFormGroup(): void {
    this.formGroupService.getFormGroup().subscribe({
      next: (data: FormGroupModel[]) => {
        this.formsGroup = data;
      },
      error: (err) => {
        console.error('Failed to fetch form group', err);
      },
    });
  }

  get questions(): FormArray {
    return this.formGroup.get('questions') as FormArray;
  }

  addQuestion(): void {
    const questionGroup = this.fb.group({
      id: [null],
      content: ['', Validators.required],
      idForm: [0],
      answers: this.fb.array([]),
    });

    this.questions.push(questionGroup);
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  submit(): void {
    if (this.formGroup.valid) {
      const formData = {
        id: this.formGroup.get('id')?.value,
        idGroup: this.formGroup.get('idGroup')?.value,
        title: this.formGroup.get('title')?.value,
        questions: this.questions.controls.map((questionControl) => {
          const questionGroup = questionControl as FormGroup;
          return {
            id: questionGroup.get('id')?.value,
            idForm: questionGroup.get('idForm')?.value,
            content: questionGroup.get('content')?.value,
            answers: [],
          } as Question;
        }),
      };

      console.log(formData);

      this.formService.createForm(formData).subscribe({
        next: (response) => {
          console.log('Form created successfully', response);
          this.closeDialog(new Event(''));
          this.formDialog.openDialogMessage(new Event('modal open'));
        },
        error: (error) => {
          console.error('Error creating Form', error);
        },
      });
    }
  }

  openDialog(event: Event): void {
    event.stopPropagation();
    this.dialog.nativeElement.showModal();
  }

  closeDialog(event: Event): void {
    event.stopPropagation();
    this.dialog.nativeElement.close();
  }
}
