import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../../services/QuestionService/question.service';
import { FormService } from 'src/app/services/FormService/form.service';
import { DialogMessageComponent } from '../../../shared/MessageDialog/dialog-message';
import { Form, Question } from 'src/app/models/interfaces/interfaces';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
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
  @ViewChild(DialogMessageComponent) dialogMessage: DialogMessageComponent;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private formService: FormService,
    private formGroupService: FormGroupService
  ) {}

  ngOnInit(): void {
    this.getForm();

    this.formService.formCreated.subscribe(() => {
      this.getForm();
    });
    this.formGroupService.formGroupCreated.subscribe(() => {
      this.getForm();
    });


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
        next: () => {
          this.closeDialog();
          this.dialogMessage.openDialog('Question Created Successfully');
        },
        error: (error) => {
          console.error('Error creating Form', error);
        },
      });
    }
  }

  openDialog(): void {
    this.questionGroup.reset();
    this.dialog.nativeElement.showModal();
  }

  closeDialog(): void {
    this.dialog.nativeElement.close();
  }
}
