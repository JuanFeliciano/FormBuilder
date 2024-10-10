import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Form, Question } from 'src/app/models/interfaces/interfaces';
import { FormService } from 'src/app/services/FormService/form.service';
import { QuestionService } from 'src/app/services/QuestionService/question.service';
import { DialogMessageComponent } from '../../../shared/MessageDialog/dialog-message';

@Component({
  selector: 'app-question-updater',
  templateUrl: './question-updater.component.html',
  styleUrls: ['./question-updater.component.scss'],
})
export class QuestionUpdaterComponent implements OnInit, OnChanges {
  questionForm: FormGroup;
  forms: Form[];

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @ViewChild(DialogMessageComponent)
  dialogMessage: DialogMessageComponent;

  @Input() questionSelected: Question;
  inputEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() questionUpdated: EventEmitter<Question> =
    new EventEmitter<Question>();

  constructor(
    private questionService: QuestionService,
    private formService: FormService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.getForms();
    this.initializeForm();
    this.setClassInput();
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

      this.questionService.update(question).subscribe({
        next: (data: Question) => {
          this.questionUpdated.emit(data);
          this.closeDialog();
          this.dialogMessage.openDialog('Question Updated Successfully');
        },
        error: (err) => {
          console.error('Error when updating question', err);

          if (this.questionForm.get('idForm')?.value <= 0) {
            this.setClassSelect();
          }
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
    this.questionForm.reset();
    this.dialog.nativeElement.showModal();
  }

  closeDialog(): void {
    this.questionForm.reset();
    this.resetStyles();
    this.dialog.nativeElement.close();
  }

  onInput(event: any): void {
    const value = event.target.value;
    const input = this.el.nativeElement.querySelector('#groupTitle');
    const text = this.el.nativeElement.querySelector('.error-input');

    if (value.length > 100) {
      this.inputEvent.emit();
    } else {
      this.renderer.removeClass(input, 'error-message');
      this.renderer.setStyle(text, 'opacity', '0');
      this.renderer.setStyle(text, 'transform', 'translateY(20px)');
    }
  }

  private setClassInput(): void {
    const input = this.el.nativeElement.querySelector('#groupTitle');
    const text = this.el.nativeElement.querySelector('.error-input');

    this.inputEvent.subscribe(() => {
      this.renderer.addClass(input, 'error-message');
      this.renderer.setStyle(text, 'opacity', '1');
      this.renderer.setStyle(text, 'transform', 'translateY(0)');
    });
  }

  private setClassSelect(): void {
    const select = this.el.nativeElement.querySelector('select');
    const text = this.el.nativeElement.querySelector('.error-select');

    this.renderer.addClass(select, 'select-empty');
    this.renderer.setStyle(text, 'opacity', '1');
    this.renderer.setStyle(text, 'transform', 'translateY(0)');
  }

  private resetStyles(): void {
    const input = this.el.nativeElement.querySelector('#groupTitle');
    const textInput = this.el.nativeElement.querySelector('.error-input');
    const select = this.el.nativeElement.querySelector('select');
    const textSelect = this.el.nativeElement.querySelector('.error-select');

    this.renderer.removeClass(input, 'error-message');
    this.renderer.setStyle(textInput, 'opacity', '0');
    this.renderer.setStyle(textInput, 'transform', 'translateY(20px)');
    this.renderer.removeClass(select, 'select-empty');
    this.renderer.setStyle(textSelect, 'opacity', '0');
    this.renderer.setStyle(textSelect, 'transform', 'translateY(20px)');
  }
}
