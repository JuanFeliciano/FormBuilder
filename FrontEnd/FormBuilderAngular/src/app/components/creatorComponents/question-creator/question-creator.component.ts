import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form, Question } from '../../../interfaces/interfaces';
import { QuestionService } from '../../../services/QuestionService/question.service';
import { FormService } from 'src/app/services/FormService/form.service';

@Component({
  selector: 'app-question-creator',
  templateUrl: './question-creator.component.html',
  styleUrls: ['./question-creator.component.scss'],
})
export class QuestionCreatorComponent {
  idForm: number;
  questionGroup: FormGroup;
  forms: Form[];

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('dialogMessage') dialogMessage: ElementRef;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.getForm();

    if (!HTMLDialogElement.prototype.showModal) {
      console.error('your browser does not support the <dialog> element');
    }

    this.questionGroup = this.fb.group({
      idForm: [null, Validators.required],
      questions: this.fb.array([this.createQuestionGroup()]),
    });
  }

  getForm(): void {
    this.formService.getForm().subscribe({
      next: (data: Form[]) => {
        this.forms = data;
      },
      error: (err) => {
        console.error('Failed fetching formgroup by id', err);
      },
    });
  }

  createQuestionGroup(): FormGroup {
    return this.fb.group({
      idForm: [0],
      content: ['', Validators.required],
    });
  }

  get questions(): FormArray {
    return this.questionGroup.get('questions') as FormArray;
  }

  addQuestion(): void {
    this.questions.push(this.createQuestionGroup());
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  submit(): void {
    if (this.questionGroup.valid) {
      const questionData: Question[] = this.questions.controls.map(
        (questionControl) => {
          return {
            idForm: this.questionGroup.get('idForm')?.value,
            content: questionControl.get('content')?.value,
          };
        }
      ) as Question[];

      this.questionService.createQuestion(questionData).subscribe({
        next: (response) => {
          console.log('Question created successfully', response);
          this.closeDialog(new Event(''));
          this.openDialogMessage(new Event('Modal open'));
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

  openDialogMessage(event: Event): void {
    event.stopPropagation();
    this.dialogMessage.nativeElement.showModal();
  }

  closeDialogMessage(): void {
    this.dialogMessage.nativeElement.close();
  }
}
