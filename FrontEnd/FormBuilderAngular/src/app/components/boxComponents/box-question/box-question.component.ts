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
import { UserService } from 'src/app/services/UserService/user.service';
import { QuestionUpdaterComponent } from '../../updaterComponents/question-updater/question-updater.component';

@Component({
  selector: 'app-box-question',
  templateUrl: './box-question.component.html',
  styleUrls: ['./box-question.component.scss'],
})
export class BoxQuestionComponent implements OnInit, OnChanges {
  userAnswers: Answer[] = [];
  user: User;
  role: string | null = this.userService.getRole();
  listGrade: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  visibleElements: boolean[];

  @Input() selectedForm: Form | null = null;
  @Input() selectedQuestionList: Question[] = [];
  @Input() idForm: number = 0;
  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @ViewChild(QuestionUpdaterComponent)
  questionUpdaterComponent: QuestionUpdaterComponent;

  constructor(
    private answerService: AnswerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.selectedQuestionList) {
      this.visibleElements = new Array(this.selectedQuestionList.length).fill(
        false
      );
    } else {
      this.visibleElements = [];
    }
  }

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

  openPutModal(): void {
    console.log('abrindo modal');
    this.questionUpdaterComponent.openDialog();
  }

  closeModal(): void {
    this.dialog.nativeElement.close();
  }

  toggleElement(index: number): void {
    this.visibleElements[index] = !this.visibleElements[index];
  }
}
