import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Answer } from 'src/app/models/interfaces/interfaces';
import { AnswerService } from 'src/app/services/AnswerService/answer.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-box-answer',
  templateUrl: './box-answer.component.html',
  styleUrls: ['./box-answer.component.scss'],
})
export class BoxAnswerComponent implements OnInit, OnChanges {
  role: string | null = this.userService.getRole();
  answerList: Answer[] = [];
  visibleElements: boolean[] = [];

  @Input() questionId: number;

  constructor(
    private answerService: AnswerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAnswerByQuestionId();

    if (this.answerList && this.answerList.length > 0) {
      this.visibleElements = new Array(this.answerList.length).fill(false);
    } else {
      this.visibleElements = [];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questionId'] && this.questionId) {
      this.getAnswerByQuestionId();
    }
  }

  getAnswerByQuestionId(): void {
    if (this.questionId > 0) {
      console.log('questionid: ', this.questionId);
      this.answerService.getAnswerByQuestionId(this.questionId).subscribe({
        next: (data: Answer[]) => {
          this.answerList = data;
        },
        error: (err) => {
          console.log('Error fetching answer by question id', err);
        },
      });
    }
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
