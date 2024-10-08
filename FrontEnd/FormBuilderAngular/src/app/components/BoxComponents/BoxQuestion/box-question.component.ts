import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AnswerService } from 'src/app/services/AnswerService/answer.service';
import { UserService } from 'src/app/services/UserService/user.service';
import { QuestionService } from 'src/app/services/QuestionService/question.service';
import { Answer, Question } from 'src/app/models/interfaces/interfaces';
import { QuestionDeleterComponent } from '../../DeleterComponents/QuestionDeleter/question-deleter.component';
import { DialogMessageComponent } from '../../../shared/MessageDialog/dialog-message';
import { QuestionUpdaterComponent } from '../../UpdaterComponents/QuestionUpdater/question-updater.component';

@Component({
  selector: 'app-box-question',
  templateUrl: './box-question.component.html',
  styleUrls: ['./box-question.component.scss'],
})
export class BoxQuestionComponent implements OnInit, OnChanges {
  @Input() formId: number;

  @ViewChild(QuestionDeleterComponent)
  questionDeleter: QuestionDeleterComponent;
  @ViewChild(DialogMessageComponent)
  dialogMessage: DialogMessageComponent;
  @ViewChild(QuestionUpdaterComponent)
  questionUpdaterComponent: QuestionUpdaterComponent;

  userAnswers: Answer[] = [];
  questionList: Question[];
  role: string | null = this.userService.getRole();
  listGrade: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  visibleElements: boolean[];

  constructor(
    private answerService: AnswerService,
    private questionService: QuestionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.questionService.questionUpdated.subscribe(() =>
      this.getQuestionByFormId()
    );
    this.questionService.questionDeleted.subscribe(() =>
      this.getQuestionByFormId()
    );
    this.questionService.questionCreated.subscribe(() =>
      this.getQuestionByFormId()
    );

    if (this.questionList) {
      this.visibleElements = new Array(this.questionList.length).fill(false);
    } else {
      this.visibleElements = [];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formId'] && !changes['formId'].isFirstChange()) {
      if (changes['formId'].previousValue !== changes['formId'].currentValue) {
        this.getQuestionByFormId();
      }
    }

    if (changes['questionList'] && this.questionList) {
      this.userAnswers = this.questionList.map((question) => ({
        id: 0,
        idQuestion: question.id,
        idUser: 0,
        grade: 0,
        description: '',
      }));

      this.visibleElements = new Array(this.questionList.length).fill(false);
    }
  }

  getQuestionByFormId(): void {
    if (this.formId != 0) {
      this.questionService.getByIdForm(this.formId).subscribe({
        next: (data: Question[]) => {
          this.questionList = data;

          this.userAnswers = this.questionList.map((question) => ({
            id: 0,
            idQuestion: question.id,
            idUser: 0,
            grade: 0,
            description: '',
          }));

          this.visibleElements = new Array(this.questionList.length).fill(
            false
          );
        },
        error: (err) => {
          console.log('error fetching questions by form id', err);
        },
      });
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
      idQuestion: this.questionList![index]?.id,
      grade: answer.grade,
      description: answer.description,
    }));

    this.answerService.bulkAnswer(answers).subscribe({
      next: () => {
        this.dialogMessage.openDialog('Responses Sent');
      },
      error: (err) => {
        console.error('Failed to submit answers', err);
        console.error('Error details: ', err.error);
      },
    });
  }

  deleteQuestion(question: Question): void {
    this.questionDeleter.deleteQuestion(question);
  }

  openPutModal(question: Question): void {
    this.questionUpdaterComponent.openDialog(question);
  }

  toggleElement(index: number): void {
    this.visibleElements[index] = !this.visibleElements[index];
  }

  canView(): boolean {
    if (this.role === 'Admin') {
      return true;
    } else {
      return false;
    }
  }
}
