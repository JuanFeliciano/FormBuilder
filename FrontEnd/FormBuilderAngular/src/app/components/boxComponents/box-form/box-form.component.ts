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
  role: string = localStorage.getItem('role')!;

  @Input() formGroupId: number;

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @ViewChild(FormUpdaterComponent) formUpdater: FormUpdaterComponent;
  @ViewChild(FormDeleterComponent) formDeleter: FormDeleterComponent;
  @ViewChild(BoxQuestionComponent) questionComponent: BoxQuestionComponent;

  constructor(
    private formService: FormService,
    private formGroupService: FormGroupService,
    private questionService: QuestionService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.formService.formUpdated.subscribe(() => {
      this.getFormByGroupId();
    });
    this.formService.formDeleted.subscribe(() => {
      this.getFormByGroupId();
    });
    this.questionService.questionCreated.subscribe(() => {
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

  openFormDialog(form: Form) {
    this.idForm = form.id;
    this.selectedForm = form;

    this.dialog.nativeElement.showModal();
  }

  closeFormDialog() {
    this.dialog.nativeElement.close();
  }

  deleteForm(id: number): void {
    const confirmDelete = confirm('Are you sure about that?');

    if (confirmDelete) {
      this.formDeleter.deleteForm(id);
    }
  }

  ActiveEditContainer(index: number) {
    const editContainers =
      this.el.nativeElement.querySelectorAll('.edit-container');

    const editContainer = editContainers[index];

    const hasClass = editContainer.classList.contains('active');

    if (hasClass) this.renderer.removeClass(editContainer, 'active');
    else this.renderer.addClass(editContainer, 'active');
  }

  openPutDialog(form: Form): void {
    this.selectedForm = form;
    this.formUpdater.dialogPut.nativeElement.showModal();
  }

  toggleElement(index: number): void {
    this.visibleElements[index] = !this.visibleElements[index];
  }
}
