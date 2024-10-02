import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionCreatorComponent } from 'src/app/components/creatorComponents/question-creator/question-creator.component';
import { QuestionDeleterComponent } from 'src/app/components/deleterComponents/question-deleter/question-deleter.component';
import { QuestionUpdaterComponent } from 'src/app/components/updaterComponents/question-updater/question-updater.component';
import { Question } from 'src/app/interfaces/interfaces';
import { QuestionService } from 'src/app/services/QuestionService/question.service';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
  question: FormGroup;
  idQuestion: number = 0;
  visibleElements: boolean[] = [];
  role: string | null = this.userService.getRole();
  filteredQuestions: Question[] = [];
  selectedQuestion: Question = { id: 0, idForm: 0, content: '', answers: [] };

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @ViewChild(QuestionUpdaterComponent)
  updaterComponent: QuestionUpdaterComponent;
  @ViewChild(QuestionDeleterComponent)
  deleterComponent: QuestionDeleterComponent;
  @ViewChild(QuestionCreatorComponent)
  creatorComponent: QuestionCreatorComponent;

  constructor(
    private questionService: QuestionService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getQuestions();

    this.question = this.fb.group({
      id: 0,
      title: '',
    });

    this.questionService.questionUpdated.subscribe(() => this.getQuestions());
    this.questionService.questionDeleted.subscribe(() => this.getQuestions());

    this.visibleElements = new Array(this.filteredQuestions.length).fill(false);
  }

  getQuestions(): void {
    this.questionService.get().subscribe({
      next: (data: Question[]) => {
        this.filteredQuestions = data;
      },
    });
  }

  getQuestionById(id: number): void {
    if (this.dialog.nativeElement.open) return;

    this.questionService.getById(id).subscribe({
      next: (data: Question) => {
        this.selectedQuestion = data;
        this.dialog.nativeElement.showModal();
      },
      error: (err) => {
        console.error('Failed to fetch question', err);
      },
    });
  }

  openDialog(event: Event, id: number): void {
    this.idQuestion = id;
    this.getQuestionById(id);
    event.stopPropagation();
  }

  closeDialog(event: Event): void {
    event.stopPropagation();
    if (this.dialog.nativeElement.open) {
      this.dialog.nativeElement.close();
    }
  }

  openPutDialog(question: Question): void {
    this.updaterComponent.openDialog(question);
    this.question.patchValue({ id: question.id, title: question.content });
  }

  createQuestion(): void {
    this.creatorComponent.openDialog();
  }

  updateQuestion(): void {
    if (this.idQuestion === 0) {
      console.error('Id da Pergunta inválido');
      return;
    }

    this.updaterComponent.dialog.nativeElement.showModal();

    this.updaterComponent.updateQuestionEmitter.subscribe(() => {
      const updatedQuestion = this.filteredQuestions.find(
        (f) => f.id === this.selectedQuestion.id
      );
      if (updatedQuestion) {
        updatedQuestion.content = this.selectedQuestion.content;
      }

      this.selectedQuestion.content =
        this.updaterComponent.questionForm.get('content')?.value;
    });
  }

  toggleElement(index: number): void {
    this.visibleElements[index] = !this.visibleElements[index];
  }

  onSearch(searchValue: string): void {
    this.questionService.get().subscribe({
      next: (data: Question[]) => {
        this.filteredQuestions = data.filter((i) =>
          i.content
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
        );
      },
    });
  }

  @HostListener('document:click', ['$event'])
  outClick(event: Event) {
    const clickInside = (event.target as HTMLElement).closest('.btn-edit');

    if (!clickInside) {
      this.visibleElements = new Array(this.filteredQuestions.length).fill(
        false
      );
    }
  }
}
