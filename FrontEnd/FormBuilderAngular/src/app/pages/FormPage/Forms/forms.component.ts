import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionCreatorComponent } from 'src/app/components/CreatorComponents/QuestionCreator/question-creator.component';
import { FormDeleterComponent } from 'src/app/components/DeleterComponents/FormDeleter/form-deleter.component';
import { FormUpdaterComponent } from 'src/app/components/UpdaterComponents/FormUpdater/form-updater.component';
import { Form } from 'src/app/models/interfaces/interfaces';
import { FormService } from 'src/app/services/FormService/form.service';
import { UserService } from 'src/app/services/UserService/user.service';
import { BoxQuestionComponent } from 'src/app/components/BoxComponents/BoxQuestion/box-question.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  form: FormGroup;
  idForm: number = 0;
  visibleElements: boolean[] = [];
  role: string | null = this.userService.getRole();
  formList: Form[] = [];
  filteredForms: Form[] = [];
  selectedForm: Form = { id: 0, idGroup: 0, title: '', questions: [] };

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @ViewChild(FormUpdaterComponent)
  updaterComponent: FormUpdaterComponent;
  @ViewChild(FormDeleterComponent)
  deleterComponent: FormDeleterComponent;
  @ViewChild(QuestionCreatorComponent)
  creatorComponent: QuestionCreatorComponent;
  @ViewChild(BoxQuestionComponent) questionComponent: BoxQuestionComponent;

  constructor(
    private formService: FormService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getForms();

    this.form = this.fb.group({
      id: 0,
      title: '',
    });

    this.formService.formUpdated.subscribe(() => this.getForms());
    this.formService.formDeleted.subscribe(() => this.getForms());

    this.visibleElements = new Array(this.formList.length).fill(false);
  }

  getForms(): void {
    this.formService.getForm().subscribe({
      next: (data: Form[]) => {
        this.formList = data;
        this.filteredForms = [...this.formList];
      },
    });
  }

  getFormById(id: number): void {
    if (this.dialog.nativeElement.open) return;

    this.formService.getFormById(id).subscribe({
      next: (data: Form) => {
        this.selectedForm = data;
        this.dialog.nativeElement.showModal();
      },
      error: (err) => {
        console.error('Failed to fetch form', err);
      },
    });
  }

  createQuestion(): void {
    this.creatorComponent.openDialog();
  }

  updateForm(form: Form): void {
    this.selectedForm = form;
    this.updaterComponent.dialogPut.nativeElement.showModal();
  }

  openDialog(id: number): void {
    this.idForm = id;
    this.getFormById(id);
  }

  closeDialog(): void {
    if (this.dialog.nativeElement.open) {
      this.dialog.nativeElement.close();
    }
  }

  openPutDialog(form: Form): void {
    this.selectedForm = form;
    this.updaterComponent.dialogPut.nativeElement.showModal();
    this.form.patchValue({ id: form.id, title: form.title });
  }

  toggleElement(index: number): void {
    this.visibleElements[index] = !this.visibleElements[index];
  }

  onSearch(searchValue: string): void {
    this.formService.getForm().subscribe({
      next: (data: Form[]) => {
        this.filteredForms = data.filter((i) =>
          i.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        );
      },
    });
  }

  canView(): boolean {
    if (this.role === 'Admin') {
      return true;
    } else {
      return false;
    }
  }

  @HostListener('document:click', ['$event'])
  outClick(event: Event) {
    const clickInside = (event.target as HTMLElement).closest('.btn-edit');

    if (!clickInside) {
      this.visibleElements = new Array(this.formList.length).fill(false);
    }
  }
}
