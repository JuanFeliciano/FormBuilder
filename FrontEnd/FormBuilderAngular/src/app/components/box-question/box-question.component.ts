import { Component, Input, OnInit } from '@angular/core';
import { Answer, Form, Question } from 'src/app/interfaces/interfaces';
import { AnswerService } from 'src/app/services/AnswerService/answer.service';

@Component({
  selector: 'app-box-question',
  templateUrl: './box-question.component.html',
  styleUrls: ['./box-question.component.scss'],
})
export class BoxQuestionComponent implements OnInit {
  @Input() selectedForm: Form | null;
  @Input() selectedQuestionList: Question[] | undefined;

  userAnswers: Answer[] = [];

  constructor(private answerService: AnswerService) {}

  ngOnInit(): void {
    console.log(this.selectedQuestionList);
    if (this.selectedQuestionList && this.selectedQuestionList.length > 0) {
      this.userAnswers = this.selectedQuestionList.map((question) => ({
        id: 0,
        idQuestion: question.id,
        grade: 0,
        description: '',
      }));
      console.log(this.userAnswers);
    } else {
      console.log('nada encontrado');
    }
  }

  submitAnswers(): void {
    const answers: Answer[] = this.userAnswers.map((answer, index) => ({
      id: answer.id,
      idQuestion: this.selectedQuestionList![index]?.id ?? 0,
      grade: answer.grade,
      description: answer.description,
    }));

    this.answerService.bulkAnswer(answers).subscribe({
      next: (response) => {
        console.log('Response submitted successfully', response);
      },
      error: (err) => {
        console.error('Failed to submit answers', err);
      },
    });
  }
}
