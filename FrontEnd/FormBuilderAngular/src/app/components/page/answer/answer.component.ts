import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/interfaces/interfaces';
import { AnswerService } from 'src/app/services/AnswerService/answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {
  answerArray: Answer[];

  constructor(private answerService: AnswerService) {}

  ngOnInit(): void {
    this.getAnswer();
  }

  getAnswer(): void {
    this.answerService.getAnswer().subscribe({
      next: (data) => {
        this.answerArray = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Error fetching answer', err);
      },
    });
  }
}
