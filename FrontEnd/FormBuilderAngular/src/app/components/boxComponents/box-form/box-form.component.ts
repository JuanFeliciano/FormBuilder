import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Form, FormGroupModel } from 'src/app/interfaces/interfaces';
import { FormService } from 'src/app/services/FormService/form.service';
import { FormUpdaterComponent } from '../../updaterComponents/form-updater/form-updater.component';
import { BoxQuestionComponent } from '../box-question/box-question.component';
import { FormGroupService } from 'src/app/services/FormGroupService/form-gp.service';
import { QuestionService } from 'src/app/services/QuestionService/question.service';
import { FormDeleterComponent } from '../../deleterComponents/form-deleter/form-deleter.component';
import { UserService } from 'src/app/services/UserService/user.service';
import { FormCreatorComponent } from '../../creatorComponents/form-creator/form-creator.component';
import { QuestionCreatorComponent } from '../../creatorComponents/question-creator/question-creator.component';

@Component({
  selector: 'app-box-form',
  templateUrl: './box-form.component.html',
  styleUrls: ['./box-form.component.scss'],
})
export class BoxFormComponent implements OnInit, OnChanges {
  formsSelected: Form[];
  idForm: number;
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
    private questionService: QuestionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.formService.formUpdated.subscribe(() => {
      this.getFormByGroupId();
    });
    this.formService.formDeleted.subscribe(() => {
      this.getFormByGroupId();
    });
    this.formService.formCreated.subscribe(() => {
      this.getFormByGroupId();
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

  createQuestion(): void {
    this.creatorComponent.openDialog();
  }

  updateForm(form: Form): void {
    this.selectedForm = form;
    this.formUpdater.dialogPut.nativeElement.showModal();

    this.formUpdater.updateEvent.subscribe(() => {
      const updatedForm = this.formsSelected.find(
        (f) => f.id === this.selectedForm.id
      );
      if (updatedForm) {
        updatedForm.title = this.selectedForm.title;
      }

      this.selectedForm.title = this.formUpdater.formGroup.get('title')?.value;
    });
  }

  openFormDialog(form: Form) {
    this.idForm = form.id;
    this.selectedForm = form;

    this.dialog.nativeElement.showModal();
  }

  closeFormDialog() {
    this.dialog.nativeElement.close();
  }

  deleteForm(form: Form): void {
    this.formDeleter.deleteForm(form);
  }

  openPutDialog(form: Form): void {
    this.selectedForm = form;
    this.formUpdater.dialogPut.nativeElement.showModal();
  }

  toggleElement(index: number): void {
    this.visibleElements[index] = !this.visibleElements[index];
  }
}
