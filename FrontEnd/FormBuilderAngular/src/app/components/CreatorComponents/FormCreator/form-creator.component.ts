import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormService } from '../../../services/FormService/form.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
import { FormGroupModel, Question } from 'src/app/models/interfaces/interfaces';
import { DialogMessageComponent } from '../../../shared/MessageDialog/dialog-message';

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.scss'],
})
export class FormCreatorComponent {
  formGroup: FormGroup;
  formsGroup: FormGroupModel[];

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild(DialogMessageComponent) dialogMessage: DialogMessageComponent;

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private formGroupService: FormGroupService
  ) {}

  ngOnInit(): void {
    this.getFormGroup();

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

      this.formService.createForm(formData).subscribe({
        next: () => {
          this.dialogMessage.openDialog('Form Created Successfully');
          this.closeDialog();
        },
        error: (error) => {
          console.error('Error creating Form', error);
        },
      });
    }
  }

  openDialog(): void {
    this.dialog.nativeElement.showModal();
  }

  closeDialog(): void {
    this.dialog.nativeElement.close();

    this.formGroup = this.fb.group({
      id: [null],
      idGroup: [null],
      title: ['', Validators.required],
      questions: this.fb.array([]),
    });
  }
}
