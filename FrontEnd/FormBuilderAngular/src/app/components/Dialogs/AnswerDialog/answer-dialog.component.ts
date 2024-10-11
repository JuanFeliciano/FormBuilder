import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Form, Question } from 'src/app/models/interfaces/interfaces';
import { FormService } from 'src/app/services/FormService/form.service';
import { QuestionCreatorComponent } from '../../CreatorComponents/QuestionCreator/question-creator.component';
import { QuestionService } from 'src/app/services/QuestionService/question.service';
import { TaggedTemplateExpr } from '@angular/compiler';

@Component({
  selector: 'app-answer-dialog',
  templateUrl: './answer-dialog.component.html',
  styleUrls: ['./answer-dialog.component.scss'],
})
export class AnswerDialogComponent implements OnChanges, OnInit {
  formSelected: Form = { id: 0, idGroup: 0, title: '', questions: [] };
  visibleAnswers: boolean[] = [];

  @Input() formId: number;

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @ViewChild(QuestionCreatorComponent)
  questionCreator: QuestionCreatorComponent;

  constructor(
    private formService: FormService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.visibleAnswers = new Array(this.formSelected.questions.length).fill(
      false
    );

    this.questionService.questionCreated.subscribe((data: Question[]) => {
      for (let question of data) {
        this.formSelected.questions.push(question);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formId'] && changes['formId'].currentValue) {
      this.getFormById();
    }
  }

  getFormById(): void {
    this.formService.getFormById(this.formId).subscribe({
      next: (data: Form) => {
        this.formSelected = data;
      },
      error: (err) => {
        console.log('error fetching form data', err);
      },
    });
  }

  closeDialog(): void {
    this.dialog.nativeElement.close();
  }

  openDialog(): void {
    this.dialog.nativeElement.showModal();
  }

  toggleAnswer(index: number): void {
    this.visibleAnswers[index] = !this.visibleAnswers[index];
  }
}
