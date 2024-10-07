import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogMessageComponent } from 'src/app/shared/MessageDialog/dialog-message';
import { Answer, Question } from 'src/app/models/interfaces/interfaces';
import { AnswerService } from 'src/app/services/AnswerService/answer.service';
import { QuestionService } from 'src/app/services/QuestionService/question.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  id: number;
  questions: Question[] = [];
  answers: Answer[];
  gradeList: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  filteredQuestion: Question[];

  @ViewChild(DialogMessageComponent) dialog: DialogMessageComponent;

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    await this.getQuestionByIdForm();
    console.log('question ng on init: ', this.questions);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questionList'] && this.questions) {
      this.answers = this.questions.map((question) => ({
        id: 0,
        idQuestion: question.id,
        idUser: 0,
        grade: 0,
        description: '',
      }));
    }
  }

  async getQuestionByIdForm(): Promise<void> {
    this.questionService.getByIdForm(this.id).subscribe({
      next: (data: Question[]) => {
        console.log('Dados recebidos:', data);
        this.filteredQuestion = data;

        this.answers = data.map(() => ({
          id: 0,
          idQuestion: 0,
          idUser: 0,
          grade: 0,
          description: '',
        }));
      },
      error: (err) => {
        console.error('Error when fetching question: ', err);
      },
    });
  }

  submit(): void {
    if (this.answers.length === 0) {
      console.warn('no answers to submit');
      return;
    }

    const answers: Answer[] = this.answers.map((answer, index) => ({
      id: 0,
      idUser: 0,
      idQuestion: this.questions![index]?.id,
      grade: answer.grade,
      description: answer.description,
    }));

    this.answerService.bulkAnswer(answers).subscribe({
      next: (response) => {
        console.log('Response submitted successfully', response);
        this.dialog.openDialog('Responses Sent');
      },
      error: (err) => {
        console.error('Failed to submit answers', err);
        console.error('Error details: ', err.error);
      },
    });
  }

  onSearch(searchValue: string): void {
    this.questionService.get().subscribe({
      next: (data: Question[]) => {
        this.filteredQuestion = data.filter((i) =>
          i.content
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
        );
      },
    });
  }
}
