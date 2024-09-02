import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Answer, Form, Question } from 'src/app/interfaces/interfaces';
import { AnswerService } from 'src/app/services/AnswerService/answer.service';
import { FormService } from 'src/app/services/FormService/form.service';

@Component({
  selector: 'app-box-question',
  templateUrl: './box-question.component.html',
  styleUrls: ['./box-question.component.scss'],
})
export class BoxQuestionComponent implements OnInit, OnChanges {
  @Input() selectedForm: Form | null = null;
  @Input() selectedQuestionList: Question[] = [];
  @Input() idForm: number = 0;
  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;

  userAnswers: Answer[] = [];

  constructor(
    private answerService: AnswerService,
    private formService: FormService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedQuestionList'] && this.selectedQuestionList) {
      this.userAnswers = this.selectedQuestionList.map((question) => ({
        IdQuestion: question.id,
        Grade: 0,
        Description: '',
      }));
    }
  }

  submitAnswers(): void {
    if (this.userAnswers.length === 0) {
      console.warn('no answers to submit');
      return;
    }

    const answers: Answer[] = this.userAnswers.map((answer, index) => ({
      IdQuestion: this.selectedQuestionList![index]?.id,
      Grade: answer.Grade,
      Description: answer.Description,
    }));

    this.answerService.bulkAnswer(answers).subscribe({
      next: (response) => {
        console.log('Response submitted successfully', response);
        this.dialog.nativeElement.showModal();
      },
      error: (err) => {
        console.error('Failed to submit answers', err);
        console.error('Error details: ', err.error);
      },
    });
  }

  closeModal() {
    this.dialog.nativeElement.close();
  }
}
