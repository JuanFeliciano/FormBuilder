import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Form, Question } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-box-question',
  templateUrl: './box-question.component.html',
  styleUrls: ['./box-question.component.scss'],
})
export class BoxQuestionComponent {
  @Input() selectedForm: Form | null;
  @Input() selectedQuestionList: Question[] | undefined;

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;

}
