import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Form, Question } from 'src/app/interfaces/interfaces';
import { FormService } from 'src/app/services/FormService/form.service';
import { QuestionService } from 'src/app/services/QuestionService/question.service';
import { DialogMessageComponent } from '../../dialogs/dialog-message';

@Component({
  selector: 'app-question-updater',
  templateUrl: './question-updater.component.html',
  styleUrls: ['./question-updater.component.scss'],
})
export class QuestionUpdaterComponent implements OnInit, OnChanges {
  questionForm: FormGroup;
  forms: Form[];

  updateQuestionEmitter: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @ViewChild(DialogMessageComponent)
  dialogMessage: DialogMessageComponent;
  @Input() questionSelected: Question;

  constructor(
    private questionService: QuestionService,
    private formService: FormService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getForms();
    this.initializeForm();
  }

  ngOnChanges(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    if (this.questionSelected) {
      this.questionForm = this.fb.group({
        id: this.questionSelected.id || 0,
        idForm: 0,
        content: this.questionSelected.content || '',
        answers: [],
      });
    }
  }

  updateQuestion(): void {
    if (this.questionForm.valid) {
      const question: Question = {
        id: this.questionSelected.id,
        idForm: Number(this.questionForm.get('idForm')?.value),
        content: this.questionForm.get('content')?.value as string,
        answers: [],
      };

      console.log('objeto question', question);
      this.questionService.update(question).subscribe({
        next: () => {
          this.closeDialog();
          this.dialogMessage.openDialog('Question Updated Successfully');

          this.updateQuestionEmitter.emit();
        },
        error: (err) => {
          console.log('Error updating Question', err);
        },
      });
    }
  }

  getForms(): void {
    this.formService.getForm().subscribe({
      next: (data: Form[]) => {
        this.forms = data;
      },
      error: (err) => {
        console.log('Error fetching Forms in Question Update Component', err);
      },
    });
  }

  openDialog(question: Question): void {
    this.questionSelected = question;
    this.dialog.nativeElement.showModal();
  }

  closeDialog(): void {
    this.dialog.nativeElement.close();
  }
}
