import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Answer, Form, Question, User } from 'src/app/interfaces/interfaces';
import { AnswerService } from 'src/app/services/AnswerService/answer.service';

@Component({
  selector: 'app-box-question',
  templateUrl: './box-question.component.html',
  styleUrls: ['./box-question.component.scss'],
})
export class BoxQuestionComponent implements OnChanges {
  userAnswers: Answer[] = [];
  user: User;

  @Input() selectedForm: Form | null = null;
  @Input() selectedQuestionList: Question[] = [];
  @Input() idForm: number = 0;
  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;

  constructor(private answerService: AnswerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedQuestionList'] && this.selectedQuestionList) {
      this.userAnswers = this.selectedQuestionList.map((question) => ({
        id: 0,
        idQuestion: question.id,
        idUser: 0,
        grade: 0,
        description: '',
      }));
    }
  }

  submitAnswers(): void {
    if (this.userAnswers.length === 0) {
      console.warn('no answers to submit');
      return;
    }

    const answers: Answer[] = this.userAnswers.map((answer, index) => ({
      id: 0,
      idUser: 0,
      idQuestion: this.selectedQuestionList![index]?.id,
      grade: answer.grade,
      description: answer.description,
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
