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

@Component({
  selector: 'app-box-question',
  templateUrl: './box-question.component.html',
  styleUrls: ['./box-question.component.scss'],
})
export class BoxQuestionComponent implements OnInit, OnChanges {
  @Input() selectedForm: Form | null = null;
  @Input() selectedQuestionList: Question[] = [];
  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;

  userAnswers: Answer[];

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

  constructor(private answerService: AnswerService) {}

  submitAnswers(): void {
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
