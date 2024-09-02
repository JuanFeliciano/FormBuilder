import {
  ChangeDetectorRef,
  Component,
  ElementRef,
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
  @Input() formGroupId: number;
  formsSelected: Form[];
  idForm: number;
  selectedForm: Form = { id: 0, idGroup: 0, title: '', questions: [] };

  @ViewChild('dialog') dialog: ElementRef<HTMLDialogElement>;
  @ViewChild(FormUpdaterComponent) formUpdater: FormUpdaterComponent;
  @ViewChild(FormDeleterComponent) formDeleter: FormDeleterComponent;
  @ViewChild(BoxQuestionComponent) questionComponent: BoxQuestionComponent;

  constructor(
    private formService: FormService,
    private formGroupService: FormGroupService,
    private questionService: QuestionService,
    private el: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formService.formUpdated.subscribe(() => {
      this.getFormByGroupId();
      this.cdr.detectChanges();
    });
    this.formService.formDeleted.subscribe(() => {
      this.getFormByGroupId();
      this.cdr.detectChanges();
    });
    this.questionService.questionCreated.subscribe(() => {
      this.getFormByGroupId();
      this.cdr.detectChanges();
    });
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

    this.cdr.detectChanges();
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
}
