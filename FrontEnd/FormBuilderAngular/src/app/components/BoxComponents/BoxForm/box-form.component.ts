import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormService } from 'src/app/services/FormService/form.service';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
import { UserService } from 'src/app/services/UserService/user.service';
import { Form, FormGroupModel } from 'src/app/models/interfaces/interfaces';
import { FormUpdaterComponent } from '../../UpdaterComponents/FormUpdater/form-updater.component';
import { FormDeleterComponent } from '../../DeleterComponents/FormDeleter/form-deleter.component';
import { BoxQuestionComponent } from '../BoxQuestion/box-question.component';
import { QuestionCreatorComponent } from '../../CreatorComponents/QuestionCreator/question-creator.component';

@Component({
  selector: 'app-box-form',
  templateUrl: './box-form.component.html',
  styleUrls: ['./box-form.component.scss'],
})
export class BoxFormComponent implements OnInit, OnChanges {
  formsSelected: Form[] = [];
  idForm: number;
  indexUpdate: number;
  indexDelete: number;
  selectedForm: Form = { id: 0, idGroup: 0, title: '', questions: [] };
  visibleElements: boolean[] = [];
  role: string | null = this.userService.getRole();

  @Input() formGroupId: number;

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @ViewChild(FormUpdaterComponent) formUpdater: FormUpdaterComponent;
  @ViewChild(FormDeleterComponent) formDeleter: FormDeleterComponent;
  @ViewChild(BoxQuestionComponent) questionComponent: BoxQuestionComponent;
  @ViewChild(QuestionCreatorComponent)
  creatorComponent: QuestionCreatorComponent;

  constructor(
    private formService: FormService,
    private formGroupService: FormGroupService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.formService.formCreated.subscribe((data: Form) => {
      this.formsSelected.push(data);
    });

    if (this.formsSelected && this.formsSelected.length > 0) {
      this.visibleElements = new Array(this.formsSelected.length).fill(false);
    } else {
      this.visibleElements = [];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formGroupId'] && !changes['formGroupId'].isFirstChange()) {
      this.getFormByGroupId();
    }
  }

  getFormByGroupId(): void {
    if (this.formGroupId != 0) {
      this.formGroupService.getFormGroupById(this.formGroupId).subscribe({
        next: (data: FormGroupModel) => {
          this.formsSelected = data.forms;
        },
        error: (err) => {
          console.error('Failed fetching formgroup by id', err);
        },
      });
    }
  }

  getFormById(): void {
    if (this.idForm != 0) {
      this.formService.getFormById(this.idForm).subscribe({
        next: (data: Form) => {
          this.selectedForm = data;
        },
        error: (err) => {
          console.error('Error when fething form by id - box form - ', err);
        },
      });
    }
  }

  createQuestion(): void {
    this.creatorComponent.openDialog();
  }

  updateForm(form: Form): void {
    this.selectedForm = form;
    this.formUpdater.formGroup.reset();
    this.formUpdater.dialogPut.nativeElement.showModal();
  }

  openFormDialog(form: Form) {
    this.idForm = form.id;
    this.selectedForm = form;

    this.dialog.nativeElement.showModal();
  }

  closeFormDialog() {
    this.dialog.nativeElement.close();
  }

  deleteForm(form: Form, index: number): void {
    this.indexDelete = index;
    this.formDeleter.deleteForm(form);
  }

  openPutDialog(form: Form, index: number): void {
    this.indexUpdate = index;
    this.selectedForm = form;
    this.formUpdater.formGroup.reset();
    this.formUpdater.dialogPut.nativeElement.showModal();
  }

  toggleElement(index: number): void {
    this.visibleElements[index] = !this.visibleElements[index];
  }

  onFormUpdated(form: Form): void {
    this.formUpdater.changeForm.subscribe(() => {
      this.formsSelected.splice(this.indexUpdate, 1);
    });
    this.formsSelected[this.indexUpdate] = form;
  }

  onFormDeleted(): void {
    this.formsSelected.splice(this.indexDelete, 1);
  }

  canView(): boolean {
    if (this.role === 'Admin') {
      return true;
    } else {
      return false;
    }
  }

  @HostListener('window:click', ['$event'])
  outClick(event: Event) {
    const clickInside = (event.target as HTMLElement).closest('.btn-edit');

    if (!clickInside) {
      this.visibleElements = new Array(this.formsSelected.length).fill(false);
    }
  }
}
